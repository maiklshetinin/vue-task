<script setup>
import { ref } from "vue";
import Dialog from "./components/Dialog.vue";
import Form from "./components/Form.vue";

const showRegisterDialog = ref(true);
const showLoginDialog = ref(false);
</script>

<template>
  <main>
    <Form />
  </main>

  <!-- <Dialog v-model="showRegisterDialog"> Registration </Dialog>
  <Dialog v-model="showLoginDialog"> Login </Dialog> -->
</template>

<style scoped></style>
