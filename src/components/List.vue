<script setup>
const props = defineProps(['name', 'list', 'properties', 'buttons'])
const emits = defineEmits(['view', 'edit', 'delete'])
</script>
<template>
  <div v-if="list.length">
    <div class="card" style="width: 30rem;">
      <div class="card-header fs-3">{{ name }}</div>
      <ul lass="list-group list-group-flush">
        <li class="list-group-item flex-row-reverse" v-for="(item, key) of list" :key="key">
          <div>
            <span v-for="property of properties">
              <span v-if="item[property.value] !== null">
                <strong>{{ (property.display) }}:</strong>
                {{
                  property.subValue
                    ? item[property.value][property.subValue]
                    : property.type === 'date'
                      ? new Date(Date.parse(item[property.value])).toLocaleDateString()
                      : item[property.value]
                }}
                <br />
              </span>
            </span>
          </div>

          <div class="text-end">
            <a v-if="buttons.view" href="#" class="btn btn-primary" @click="$emit('view', key, item.id)">
              <i class="fa-regular fa-eye"></i> Ver
            </a>
            <a v-if="buttons.edit" href="#" class="btn btn-primary" @click="$emit('edit', key, item.id)">
              <i class="fa-regular fa-pen-to-square"></i> Editar
            </a>
            <a v-if="buttons.delete" href="#" class="btn btn-danger" @click="$emit('delete', key, item.id)">
              <i class="fa-regular fa-trash-can"></i> Borrar
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p class="text-danger fs-3">No hay elementos que mostrar</p>
  </div>
</template>
<style>
</style>