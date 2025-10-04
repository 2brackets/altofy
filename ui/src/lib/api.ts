import { config } from "../config";
import type { ApiResponse } from "../models/apiResponse";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class Api {
  private static baseUrl = config.apiBaseUrl;

  private static async request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<ApiResponse<T>>;
  }

  static get<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, "GET");
  }

  static post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, "POST", body);
  }

  static put<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, "PUT", body);
  }

  static delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, "DELETE");
  }
}
