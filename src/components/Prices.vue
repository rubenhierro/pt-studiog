<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import Price from '../classes/price';

export default {
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {
      start: null,
      end: null,
      amount: null,
    };
  },
  computed: {
    prices() {
      return this.store.prices
    },
    selectDragAttribute() {
      return {
        popover: {
          visibility: 'hover',
          isInteractive: false, // Defaults to true when using slot
        },
      };
    },
  },
  watch: {
    start(val) {
      this.end = val
    }
  },
  methods: {
    addPrice() {
      const price = new Price(
        this.start, this.end, this.amount
      )
      this.$emit('addPrice', price)
      this.start = null
      this.end = null
      this.amount = null
    },
  }
}
</script>
<template>
  <form id="prices-form" @submit.prevent="addPrice">
    <DatePicker class="inline-block h-full" v-model="start">
      <template v-slot="{ inputValue, togglePopover }">
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="togglePopover()">
            <i class="fa-regular fa-calendar-check"></i>
          </button>
          <input :value="inputValue" type="text" class="form-control" placeholder="Fecha inicial" required />
        </div>
      </template>
    </DatePicker>

    <DatePicker class="inline-block h-full" v-model="end">
      <template v-slot="{ inputValue, togglePopover }">
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="togglePopover()">
            <i class="fa-regular fa-calendar-check"></i>
          </button>
          <input :value="inputValue" type="text" class="form-control" placeholder="Fecha final" required />
        </div>
      </template>
    </DatePicker>
    <div class="col-md-6 pt-3">
      <input type="number" v-model="amount" placeholder="Precio del producto" min="0" required />
    </div>
    <br />
    <div class="col pt-2 text-right">
      <button class="p-2 px-4 btn btn-primary shadow-lg">Guardar</button>
    </div>
  </form>
</template>