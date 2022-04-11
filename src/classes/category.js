export default class category {
  code;
  name;
  description;
  isChild;
  parentCategory;

  constructor(code, name, description, isChild, parentCategory) {
    (this.code = code),
      (this.name = name),
      (this.description = description),
      (this.isChild = isChild),
      (this.parentCategory = parentCategory);
  }
}
