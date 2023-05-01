<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type { PartnerShip } from "../../types";
import { partners } from "../../stores/partners";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  partnerInfo: {
    type: Object as PropType<PartnerShip>,
    default: {},
  },
  imgLink: {
    type: String as PropType<string | null>,
    defualt: "",
  },
});
const emit = defineEmits(["submitInfo", "closeModal", "submit"]);
const { partnerInfo } = toRefs(props);
const closeModal = () => {
  v$.value.$reset();
  emit("closeModal");
  err.value = "";
};
watch(partnerInfo, (val: PartnerShip) => {
  // @ts-ignore
  formData.image = val?.image || File;
  formData.text = val?.text || "";
});
const formData = reactive({
  text: "",
  image: null,
});
const rules = {
  text: {
    required,
  },
  image: {
    required,
  },
};
const v$ = useVuelidate(rules, formData);
const processing = ref(false);
const err = ref("");
const submitData = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  processing.value = true;
  if (props.partnerInfo?._id) {
    processing.value = true;
    partners()
    // @ts-ignore
      .updatepartnerShips(formData, partnerInfo.value._id)
      .then(() => {
        closeModal();
        emit("submit");
      })
      .catch((error) => {
        err.value = error.message;
      })
      .finally(() => {
        processing.value = false;
      });
  } else {
    processing.value = true;
    partners()
    // @ts-ignore
      .createpartnerShips(formData)
      .then(() => {
        closeModal();
        emit("submit");
      })
      .catch((error) => {
        err.value = error.message;
      })
      .finally(() => {
        processing.value = false;
      });
  }
};
</script>

<template>
  <over-lay-loader v-if="processing" />

  <modal
    :open="show"
    :title="
      partnerInfo._id?.length === 0
        ? 'Create PartnerShip'
        : 'Update PartnerShip'
    "
    @close="closeModal"
  >
    <form @submit.prevent="submitData" class="px-4 edit-form">
      <div class="flex flex-col gap-3">
        <div>
          <base-input v-model="formData.text" id="Link" title="Link" />
          <div
            class="input-errors"
            v-for="error of v$.text.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <img-input v-model="formData.image" :link="imgLink" />
          <div
            class="input-errors"
            v-for="error of v$.image.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="input-errors">{{ err }}</div>
        <base-button
          type="submit"
          class="mt-4 text-center hover:bg-primary-600 duration-300 transition-all"
          >{{
            partnerInfo._id?.length === 0 ? "Create" : "Update"
          }}</base-button
        >
      </div>
    </form>
  </modal>
</template>
  
  <style>
</style>