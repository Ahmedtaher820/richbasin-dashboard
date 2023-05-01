<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type { PublicFormData } from "../../types";
import { news } from "../../stores/news";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  newsInfo: {
    type: Object as PropType<PublicFormData>,
    default: {},
  },
  imgLink: {
    type: String as PropType<string | null>,
    defualt: "",
  },
});
const emit = defineEmits(["submitInfo", "closeModal", "submit"]);
const { newsInfo } = toRefs(props);
watch(newsInfo, (val: PublicFormData) => {
  formData.header = val.header || "";
  formData.content = val.content || "";
  // @ts-ignore
  formData.image = val.image || null;
  // @ts-ignore
  if (val.date?.length > 0) {
      formData.date =
      // @ts-ignore
      new Date(val.date).toISOString().slice(0, 10).split("/").join("-") || "";
  } else {
    formData.date = "";
  }
});
const closeModal = () => {
  v$.value.$reset();
  emit("closeModal");
  err.value = "";

};
const formData = reactive({
  header: "",
  content: "",
  image: null,
  date: "",
});
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
  date: {
    required,
  },
};
const v$ = useVuelidate(rules, formData);
const processing = ref(false);
const err = ref('')
const submitData = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  processing.value = true;
  if (props.newsInfo?._id) {
    processing.value = true;

    news()
    //@ts-ignore
      .updateNews(formData, newsInfo.value._id)
      .then(() => {
        closeModal();
        emit("submit");
      }).catch((error) => {
        err.value = error.message;
      })
      .finally(() => {
        processing.value = false;
      });
  } else {
    processing.value = true;
    news()
    //@ts-ignore
      .createNews(formData)
      .then(() => {
        closeModal();
        emit("submit");
      }).catch((error) => {
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
    :title="newsInfo._id?.length === 0 ? 'Create News' : 'Update News'"
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
          <base-input v-model="formData.content" id="Content" title="Content" />
          <div
            class="input-errors"
            v-for="error of v$.content.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <div class="flex flex-col">
            <label class="text-base mb-1" for="date">Date</label>
            <input
              type="date"
              class="border ps-2 py-2 rounded-md"
              name="date"
              id="date"
              v-model="formData.date"
            />
          </div>
          <div
            class="input-errors"
            v-for="error of v$.date.$errors"
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
            newsInfo.content?.length === 0 ? "Create" : "Update"
          }}</base-button
        >
      </div>
    </form>
  </modal>
</template>
  
  <style>
</style>