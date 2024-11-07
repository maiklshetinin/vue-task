<script setup>
import { ref } from "vue";
import Form from "./components/Form.vue";

const initiator = ref("Иван");
const nameCollection = ref("Экскурсия");
const sum = ref("");
</script>

<template>
  <Form v-model="sum" :initiator="initiator" :nameCollection="nameCollection" />
</template>

<style scoped></style>
