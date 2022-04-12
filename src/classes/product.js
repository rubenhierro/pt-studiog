export default class Product {
  code;
  name;
  description;
  photos;
  categories;
  prices;
  defaultPrice;
  constructor(
    code,
    name,
    description,
    photos,
    categories,
    prices,
    defaultPrice
  ) {
    (this.code = code),
      (this.name = name),
      (this.description = description),
      (this.photos = photos),
      (this.categories = categories),
      (this.prices = prices),
      (this.defaultPrice = defaultPrice);
  }
}
