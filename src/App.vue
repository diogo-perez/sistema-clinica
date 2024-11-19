<template>
  <div class="font-montserrat bg-gray-50 h-screen flex flex-col">
    <ClinicHeader />
    <div class="flex-1 p-24">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ClinicHeader from '@/components/ClinicHeader.vue';

export default {
  name: 'App',
  components: {
    ClinicHeader,
  }
}
</script>

<style scoped></style>
