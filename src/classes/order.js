export default class Order {
  date;
  product;
  quantity;
  total;
  constructor(date, product, quantity, total) {
    (this.date = date),
      (this.product = product),
      (this.quantity = quantity),
      (this.total = total);
  }
}
