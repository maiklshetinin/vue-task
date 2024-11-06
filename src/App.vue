<script setup>
import { ref } from "vue";
import Dialog from "./components/Dialog.vue";
import Form from "./components/Form.vue";

const initiator = ref("Иван");
const nameCollection = ref("Экскурсия");
</script>

<template>
  <main>
    <Form :initiator="initiator" :nameCollection="nameCollection" />
  </main>

  <!-- <Dialog v-model="showRegisterDialog"> Registration </Dialog>
  <Dialog v-model="showLoginDialog"> Login </Dialog> -->
</template>

<style scoped></style>
