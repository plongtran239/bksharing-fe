export type EntityErrorPayload = {
  name: string;
  message: string[] | string;
  path: string;
  timestamp: string;
  stack: string;
  statusCode: number;
};

class HttpError extends Error {
  status: number;
  payload: unknown;

  constructor({ status, payload }: { status: number; payload: unknown }) {
    super(`HTTP error: ${status}`);

    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: number;
  payload: EntityErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });

    this.status = status;
    this.payload = payload;
  }
}
