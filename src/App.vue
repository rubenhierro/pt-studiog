<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Head from '../src/components/Head.vue'
import Foot from '../src/components/Foot.vue'
</script>

<template>
  <div class="container">
    <header>
      <Head />
    </header>
    <RouterView />
    <footer>
      <Foot />
    </footer>
  </div>
</template>

<style>
@import "@/assets/base.css";

</style>
