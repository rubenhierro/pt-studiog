<script setup>
const year = new Date().getFullYear()
</script>
<template>
  <div class="footer text-center">{{ year }} - Ruben Hierro</div>
</template>
<style>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  min-height: 75px;
  margin-top: 20px;
}
</style>