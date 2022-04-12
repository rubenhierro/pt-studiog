<script>
export default {
  name: 'Photos',
  emits: ['addPhoto'],
  data() {
    return {
      selectecFile: null
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectecFile = event.target.files[0]
    },
    onUpload() {
      if (this.selectecFile) {
        const reader = new FileReader()
        reader.readAsDataURL(this.selectecFile)

        reader.onload = event => {
          const imgObj = { name: this.selectecFile.name, img: reader.result }
          this.$emit('addPhoto', imgObj)
          const photoInput = document.getElementById('formFile')
          photoInput.value = null
          this.selectecFile = null
        }
      }
    },
  }
}
</script>
<template>

  <div class="mb-3">
    <form @submit.prevent="onUpload">
      <label for="formFile" class="form-label">Añadir imagen</label>
      <input class="form-control" type="file" id="formFile" accept="image/*" @change="onFileSelected">
      <div class="col pt-3 text-right">
        <button class="p-2 px-4 btn btn-primary shadow-lg submit">Subir</button>
      </div>
    </form>
  </div>
</template>