import { BASE_URL } from "@/constants";
import { API_RESPONSE } from "@/types/interfaces";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class Api {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: error.message,
          status: error.response?.status,
          code: error.code,
        };
        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string): Promise<API_RESPONSE<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url);
      return {
        data: response.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async post<T>(url: string, data?: unknown): Promise<API_RESPONSE<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(url, data);
      return {
        data: response.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async put<T>(url: string, data?: unknown): Promise<API_RESPONSE<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(url, data);
      return {
        data: response.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
  async patch<T>(url: string, data?: unknown): Promise<API_RESPONSE<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.patch(url, data);
      return {
        data: response.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async delete<T>(url: string): Promise<API_RESPONSE<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(url);
      return {
        data: response.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  private handleError(error: AxiosError): ApiError {
    return {
      message: error.message,
      status: error.response?.status,
      code: error.code,
    };
  }
}
