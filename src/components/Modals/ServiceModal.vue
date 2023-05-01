<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { PropType } from "vue";
import { storeToRefs } from "pinia";
import { services } from "../../stores/services";
import type { PublicFormData } from "../../types";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  servicesInfo: {
    type: Object as PropType<PublicFormData>,
    default: {},
  },
  imgLink: {
    type: String as PropType<string | null>,
    defualt: "",
  },
  processing: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["create", "update", "closeModal","submit"]);
// const {} = storeToRefs()
const { servicesInfo } = toRefs(props);
const formData = reactive({
  header: "",
  content: "",
  image: null,
});
watch(servicesInfo, (val: PublicFormData) => {
  formData.header = val?.header || "";
  formData.content = val?.content || "";
  // @ts-ignore
  formData.image = val?.image || "";
});
const closeModal = () => {
  v$.value.$reset();
  emit("closeModal");
  err.value = ''
};
const rules = {
  header: {
    required,
  },
  content: {
    required,
  },
  image: {
    required,
  },
};
const info = ref<PublicFormData[]>([]);
const v$ = useVuelidate(rules, formData);
const processing = ref(false);
const err = ref("");
const submitData = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  if (props.servicesInfo?.content) {
    const payload = { ...formData, _id: servicesInfo.value._id };
    processing.value = true;

    services()
      //@ts-ignore
      .updateServices(payload, servicesInfo.value._id)
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
    services()
      //@ts-ignore
      .createServices(formData)
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
      servicesInfo._id?.length === 0 ? 'Create Services' : 'Update Services'
    "
    @close="closeModal"
  >
    <form @submit.prevent="submitData" class="px-4 edit-form">
      <div class="flex flex-col gap-3">
        <div>
          <base-input v-model="formData.header" id="Header" title="Header" />
          <div
            class="input-errors"
            v-for="error of v$.header.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <div class="flex flex-col">
            <label for="content" class="text-base mb-1">Content</label>
            <textarea
              id="content"
              class="border p-2 focus:outline-none"
              rows="4"
              v-model="formData.content"
            ></textarea>
            <span class="text-sm text-zinc-500"
              >*Please note that each - means that you are creating a new
              item*</span
            >
          </div>
          <div
            class="input-errors"
            v-for="error of v$.content.$errors"
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
            servicesInfo.content?.length === 0 ? "Create" : "Update"
          }}</base-button
        >
      </div>
    </form>
  </modal>
</template>
  
  <style>
</style>