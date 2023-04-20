<script lang="ts" setup>
import type { PropType } from 'vue'

const prop = defineProps({
  modelValue: {
    type: File as PropType<File | null>,
    default: null,
  },

  link: {
    type: String as PropType<String | null>,
  },
})

const emit = defineEmits(['update:modelValue'])

const file = ref()
const triggerFile = () => {
  file.value.click()
}

const onInputChange = (event) => {
  emit('update:modelValue', event.target.files[0])
}
</script>

<template>
    <label class="text-base mb-1 block">Image</label>

  <div
    class="w-full flex items-center justify-between py-3 border ps-4 pe-4 overflow-x-scroll"
    :class="{ 'border-green-400 border-2 rounded-sm': !!modelValue }"
  >
    <span class="w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
      <img v-if="link" width="150" height="150" :src="link">
      <svg
        v-else
        class="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </span>
    <span v-if="modelValue" class="font-bold text-gray-600">{{ modelValue.name }}</span>
    <input ref="file" type="file" accept="image/*" class="hidden" @change="onInputChange">
    <button
      type="button"
      class="
        py-2
        font-medium
        leading-4
        text-gray-700
        border border-gray-300
        rounded-md
        shadow-sm
        ms-5
        ps-3
        pe-3
        hover:bg-gray-50
        focus:outline-none
        focus:ring-2
        focus:ring-primary-500
        focus:ring-offset-2
      "
      @click="triggerFile"
    >
      Upload
    </button>
  </div>
</template>
