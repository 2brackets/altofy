export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  metadata?: unknown;
}