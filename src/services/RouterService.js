export default class {
  getSlug(name) {
    return name
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[-\s]+/g, "-");
  }
}
