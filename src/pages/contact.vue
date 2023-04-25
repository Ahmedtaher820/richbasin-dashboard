<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};
const formData = reactive({
  email: "",
  phoneNumber: "",
  location: {
    lat: 0,
    long: 0,
  },
});
const rules = {
  email: {
    required,
  },
  phoneNumber: {
    required,
  },
  location: {
    lat: {
      required,
    },
    long: {
      required,
    },
  },
};
const v$ = useVuelidate(rules, formData);
const processing = ref(false);
const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  processing.value = true;
};
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-4xl text-primary">Contact</h1>
  </div>
  <div class="mt-6">
    <form>
      <div>
        <h2 class="mb-2 text-primary text-2xl">Basic Contact</h2>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 gap-y-6">
          <div>
            <base-input v-model="formData.email" id="email" title="email" />
            <div
              class="input-errors"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div>
            <base-input
              v-model="formData.email"
              id="phoneNumber"
              title="Phone Number"
            />
            <div
              class="input-errors"
              v-for="error of v$.phoneNumber.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 gap-y-6"></div>

        <div class="col-span-2">
          <h2 class="mt-6 mb-2 text-primary text-2xl">Location</h2>
          <div class="grid md:grid-cols-2 grid-cols-1 gap-4 gap-y-6">
            <div>
              <base-input
                v-model="formData.email"
                id="latitude"
                title="Latitude"
                type="number"
              />
              <div
                class="input-errors"
                v-for="error of v$.location.lat.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <div>
              <base-input
                v-model="formData.email"
                id="longitude"
                title="Longitude"
                type="number"
              />
              <div
                class="input-errors"
                v-for="error of v$.location.long.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <base-button
        type="submit"
        class="w-fit ms-auto mt-4 text-center hover:bg-primary-600 duration-300 transition-all"
        @submit.prevent="submitForm"
        >Update</base-button
      >
    </form>
  </div>
  <!-- <service-modal :show="showModal" @closeModal="closeModal"></service-modal> -->
</template>
  
  <style>
</style>