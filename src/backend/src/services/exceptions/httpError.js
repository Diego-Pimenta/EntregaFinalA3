export class HttpError extends Error {
  constructor(statusCode, msg) {
    super(msg);
    this.statusCode = statusCode;
  }
}
