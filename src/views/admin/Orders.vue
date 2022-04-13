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
      // indexProduct: null,
      product: null,
      selectedProduct: null,
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
      if (this.date && this.selectedProduct && this.quantity) {
        const price = this.isPriceInRange()
        if (price) {
          return this.quantity * price
        } else {
          return this.quantity * this.selectedProduct.defaultPrice
        }
      }
    }
  },
  methods: {
    getProductByName() {
      this.selectedProduct = this.productsStore.getProductByName(this.product)
    },
    isPriceInRange() {
      for (const price of this.selectedProduct.prices) {
        if (price.start <= this.date && price.end >= this.date)
          return price.price
      }
    },
    addOrder() {
      const order = new Order(
        this.date, this.selectedProduct, this.quantity, this.total
      )
      !this.isEditing
        ? this.store.addOrder(order)
        : this.store.editOrder(this.currentOrder, order)
      this.date = new Date()
      this.indexProduct = null
      this.product = null
      this.selectedProduct = null
      this.quantity = 1
      this.total = null
      this.isEditing = false
    },
    editOrder(id) {
      this.isEditing = true
      this.date = this.store.orders[id].date
      this.product = this.store.orders[id].product.name
      this.quantity = this.store.orders[id].quantity
      this.currentOrder = id
    },
    deleteOrder(id) {
      this.store.deleteOrder(id)
    }
  },
  watch: {
    product(val) {
      this.getProductByName()
    }
  }
}
</script>
<template>
  <div class="container">
    <h1>Admin Pedidos</h1>
  </div>
  <div class="row" v-if="products.length">
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
              <select class="form-select" aria-label="Default select example" v-model="product"
                @change="getProductByName">
                <option selected>Elegir producto</option>
                <option v-for="(product, index) of products" :index="index" :value="product.name"
                  :selected="{ true: product.name === product }">{{
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
  <div v-else>
    <p class="text-danger fs-3">No hay productos que mostrar</p>
  </div>
</template>