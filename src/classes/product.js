export default class Product {
  code;
  name;
  description;
  photos;
  categories;
  prices;
  constructor(code, name, description, photos, categories, prices) {
    (this.code = code),
      (this.name = name),
      (this.description = description),
      (this.photos = photos),
      (this.categories = categories),
      (this.prices = prices);
  }
}
