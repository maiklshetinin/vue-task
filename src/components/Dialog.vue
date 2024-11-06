<template>
  <div class="modal-overlay" v-if="isVisible" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">✖</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const isVisible = defineModel();

const close = () => {
  console.log("ggg");
  isVisible.value = false;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--dark-middle);
  padding: 80px;
  border-radius: 40px;
  position: relative;
}

.close-button {
  padding: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  outline: none;
}
</style>
