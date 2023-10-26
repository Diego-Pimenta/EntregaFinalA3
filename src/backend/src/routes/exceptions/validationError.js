export class ValidationError extends Error {
  constructor(msg, errors) {
    super(msg);
    this.errors = errors;
  }
}
