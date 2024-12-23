import { BASE_URL } from "@/constants";
import { ProductForm } from "@/types/product";
import axios from "axios";

export class ProductService {
  async create(create: ProductForm) {
    console.log(create);
    const req = await axios.post(`${BASE_URL}/api/product`, create, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    return req.data;
  }
  async getAll() {
    try {
      const req = await axios.get(`${BASE_URL}/api/product`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (req.status === 401) {
        throw new Error("UNAUTHORIZED");
      }

      return req.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Specific Axios error handling
        const axiosError = error;

        if (axiosError.response?.status === 404) {
          console.error("Resource not found");
        } else if (axiosError.response?.status === 500) {
          console.error("Server error");
        } else if (axiosError.code === "ECONNABORTED") {
          console.error("Request timed out");
        }
      }
    }
  }

  async GetById(id: string) {
    try {
      const req = await axios.get(`${BASE_URL}/api/product/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (req.status === 401) {
        throw new Error("UNAUTHORIZED");
      }

      return req.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Specific Axios error handling
        const axiosError = error;

        if (axiosError.response?.status === 404) {
          console.error("Resource not found");
        } else if (axiosError.response?.status === 500) {
          console.error("Server error");
        } else if (axiosError.code === "ECONNABORTED") {
          console.error("Request timed out");
        }
      }
    }
  }

  async update(data: ProductForm) {
    const req = await axios.put(`${BASE_URL}/api/product/${data.id}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    return req.data;
  }

  async delete(id: string) {
    const req = await axios.delete(`${BASE_URL}/api/product/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return req.data;
  }
}
