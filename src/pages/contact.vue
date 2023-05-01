<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { contact } from "../stores/contact";
import { storeToRefs } from "pinia";
import type { Contact } from "../types";
const {contactInfo} = storeToRefs(contact())
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};
const formData = reactive({
  email: "",
  phoneNumber1: "",
  phoneNumber2: "",
  location: "",
  map: {
    lat: '0',
    long: '0',
  },
});
const rules = {
  email: {
    required,
  },
  phoneNumber1: {
    required,
  },
  phoneNumber2: {
    required,
  },
  map: {
    lat: {
      required,
    },
    long: {
      required,
    },
  },
  location: {
    required,
  },
};
const v$ = useVuelidate(rules, formData);
const processing = ref(false);
const contactId = ref('')

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  processing.value = true;
  const formDataInfo: Contact = {
    email: formData.email,
    phoneNumber1: formData.phoneNumber1,
    phoneNumber2: formData.phoneNumber2,
    location: {
      coordinates: [`${formData.map.lat}`, `${formData.map.long}`],
      address: formData.location,
    },
  };
  contact()
    .updateContact(formDataInfo,contactId.value)
    .finally(() => {
      processing.value = false;
    });
};
onMounted(() => {
  if(!contactInfo.value._id?.length){
    processing.value = true;
    contact()
      .getContact()
      .then((res) => {
        contactId.value = res.data.documents[0]._id
        formData.email = res.data.documents[0].email
        formData.location = res.data.documents[0].location.address
        formData.phoneNumber1 = res.data.documents[0].phoneNumber1
        formData.phoneNumber2 = res.data.documents[0].phoneNumber2
        formData.map.lat = res.data.documents[0].location.coordinates[0]
        formData.map.long = res.data.documents[0].location.coordinates[1]
        console.log(res.data.documents[0].location.coordinates[1])
      })
      .finally(() => {
        processing.value = false;
      });
  }else{
    contactId.value = contactInfo.value._id
        formData.email = contactInfo.value.email
        formData.location = contactInfo.value.location.address
        formData.phoneNumber1 = contactInfo.value.phoneNumber1
        formData.phoneNumber2 = contactInfo.value.phoneNumber2
        formData.map.lat = contactInfo.value.location.coordinates[0]
        formData.map.long = contactInfo.value.location.coordinates[1]
  }
});
</script>

<template>
  <over-lay-loader v-if="processing" />
  <div class="flex items-center justify-between">
    <h1 class="text-4xl text-primary">Contact</h1>
  </div>
  <div class="mt-6">
    <form @submit.prevent="submitForm">
      <div>
        <h2 class="mb-2 text-primary text-2xl">Basic Contact</h2>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 gap-y-3">
          <div class="col-span-2">
            <base-input v-model="formData.email" id="email" title="email" />
            <div
              class="input-errors"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="col-span-2">
          <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <base-input
                  v-model="formData.phoneNumber1"
                  id="phoneNumber"
                  title="First Phone Number"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.phoneNumber1.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div>
                <base-input
                  v-model="formData.phoneNumber2"
                  id="phoneNumber"
                  title="Second Phone Number"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.phoneNumber2.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 gap-y-6"></div>

        <div class="col-span-2">
          <h2 class="mt-6 mb-2 text-primary text-2xl">Location</h2>
          <div class="mb-3">
            <base-input
              v-model="formData.location"
              id="location"
              title="location"
            />
          </div>
          <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <base-input
                v-model="formData.map.lat"
                id="latitude"
                title="Latitude"
              />
              <div
                class="input-errors"
                v-for="error of v$.map.lat.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <div>
              <base-input
                v-model="formData.map.long"
                id="longitude"
                title="Longitude"
                step="0.1"
              />
              <div
                class="input-errors"
                v-for="error of v$.map.long.$errors"
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
        >Update</base-button
      >
    </form>
  </div>
  <!-- <service-modal :show="showModal" @closeModal="closeModal"></service-modal> -->
</template>
  
  <style>
</style>