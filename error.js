export class HttpError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "Http error";
  }
}
