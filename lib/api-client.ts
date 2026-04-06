const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class ApiClient {
  private static instance: ApiClient;
  private token: string | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("teraq_token");
    }
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("teraq_token", token);
    } else {
      localStorage.removeItem("teraq_token");
    }
  }

  public async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = new Headers(options.headers);

    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Convenience methods
  public get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(endpoint: string, body?: any, options?: RequestInit) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: "POST", 
      body: JSON.stringify(body) 
    });
  }

  public patch<T>(endpoint: string, body?: any, options?: RequestInit) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: "PATCH", 
      body: JSON.stringify(body) 
    });
  }

  public delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = ApiClient.getInstance();
