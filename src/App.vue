<script setup>
import { ref } from "vue";
import Dialog from "./components/Dialog.vue";
import Form from "./components/Form.vue";

const initiator = ref("Иван");
const nameCollection = ref("Экскурсия");
const sum = ref("");
</script>

<template>
  <main>
    <Form
      v-model="sum"
      :initiator="initiator"
      :nameCollection="nameCollection"
    />
  </main>

  <!-- <Dialog v-model="showRegisterDialog"> Registration </Dialog>
  <Dialog v-model="showLoginDialog"> Login </Dialog> -->
</template>

<style scoped></style>
