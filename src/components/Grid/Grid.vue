<template>
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <slot name="grid-header" />
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <slot />
      </tbody>
    </table>
  </template>
  