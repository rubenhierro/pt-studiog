<script>
import Photos from '../../components/Photos.vue'

export default {
  components: { Photos },
  data() {
    return {
      photos: [],
      preview: false
    }
  },
  methods: {
    addPhoto(photo) {
      this.photos.push(photo)
    },
    deletePhoto(id) {
      this.photos = this.photos.filter((i, key) => key !== id)
    },
    previewPhoto(id) {
      this.preview = true
      console.log(id);
      const img = this.photos[id].img
      document.getElementById('preview').setAttribute('src', '')
      document.getElementById('preview').setAttribute('src', img)
      console.log(preview)
    }
  },
}
</script>
<template>
  <ul v-if="photos.length">
    <li v-for="(photo, index) of photos" :index="index">
      {{ photo.name }}
      <span class="text-primary btn" @click="previewPhoto(index)">[Vista previa]</span>
      <span class="text-danger btn" @click="deletePhoto(index)">[Eliminar]</span>
    </li>
  </ul>
  <div v-if="preview">
    <div class="card">
      <div class="card-content">
        <img id="preview" src="" alt="Vista previa" width="150" />
        <p class="text-danger btn" @click="this.preview = false">[Cerrar]</p>
      </div>
    </div>
  </div>
  <Photos @addPhoto="addPhoto" />
</template>
<style>
</style>