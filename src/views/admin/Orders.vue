<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { useProductsStore } from '../../stores/ProductsStore';
import { useOrdersStore } from '../../stores/OrdersStore'
import Order from '../../classes/order'
import List from '../../components/List.vue'

export default {
  components: {
    Calendar,
    DatePicker,
    List
  },
  data() {
    return {
      productsStore: useProductsStore(),
      store: useOrdersStore(),
      date: new Date(),
      indexProduct: null,
      product: null,
      quantity: null,
      isEditing: false,
      currentOrder: null,
    };
  },
  computed: {
    productName() {
      if (this.product) {
        return this.product.name
      }
    },
    products() {
      return this.productsStore.products
    },
    orders() {
      return this.store.orders
    },
    total() {
      if (this.date && this.product && this.quantity) {
        const price = this.isPriceInRange()
        if (price) {
          return this.quantity * price
        } else {
          return this.quantity * this.product.defaultPrice
        }
      }
    }
  },
  methods: {
    getProduct() {
      this.product = this.productsStore.getProduct(this.indexProduct)
    },
    isPriceInRange() {
      for (const price of this.product.prices) {
        if (price.start <= this.date && price.end >= this.date)
          return price.price
      }
    },
    addOrder() {
      const order = new Order(
        this.date, this.product, this.quantity, this.total
      )
      console.log(order);
      !this.isEditing
        ? this.store.addOrder(order)
        : this.store.editOrder(this.currentOrder, order)
      this.date = new Date()
      this.indexProduct = null
      this.product = null
      this.quantity = null
      this.total = null
      this.isEditing = false
    },
    editOrder(id) {
      this.isEditing = true
      this.date = this.store.orders[id].date
      this.product = this.store.orders[id].product
      this.quantity = this.store.orders[id].quantity
      this.total = this.store.orders[id].total
      this.currentOrder = id
    },
    deleteOrder(id) {
      this.store.deleteOrder(id)
    }
  }
}
</script>
<template>
  <div class="container">
    <h1>Admin Pedidos</h1>
  </div>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="card-title">Nuevo Pedido</div>
          <span v-if="isEditing" class="text-danger">Editar Pedido</span>
          <form @submit.prevent="addOrder">
            <!-- Calendario -->
            <DatePicker v-model="date" />
            <div>
              <span>Fecha: {{ new Date(date).toLocaleDateString() }}</span>
            </div>

            <!-- Producto -->
            <div class="col-md-6 pt-3">
              <select class="form-select" aria-label="Default select example" v-model="indexProduct"
                @change="getProduct()">
                <option selected>Elegir producto</option>
                <option v-for="(product, index) of products" :index="index" :value="index"
                  :selected="{ true: product.name === productName }">{{
                    product.name
                  }}
                </option>
              </select>
            </div>

            <!-- Cantidad -->
            <div class="col-md-6 pt-3">
              <input type="number" id="quantityInput" v-model="quantity" placeholder="Cantidad" required />
            </div>

            <!-- Total -->
            <div class="col-md-6 pt-3">
              <label for="totalInput" class="me-2">Total:</label>
              <input type="number" id="totalInput" v-model="total" placeholder="Cantidad" required />
            </div>

            <!-- Button -->
            <div class="col pt-3 text-right">
              <button class="p-2 px-4 btn btn-primary shadow-lg">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col">
      <List :name="'Pedidos'" :list="orders" :properties="[
        { display: 'Fecha', value: 'date', type: 'date' },
        { display: 'Producto', value: 'product', subValue: 'name' },
        { display: 'Cantidad', value: 'quantity' },
        { display: 'Total', value: 'total' }
      ]" :buttons="{ edit: true, delete: true }" @edit="editOrder" @delete="deleteOrder" />
    </div>
  </div>
</template>