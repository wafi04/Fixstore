import { BASE_URL } from "@/constants";
import axios from "axios";

export default class VariantsService {
  async create(data: FormData) {
    const req = await axios.post(`${BASE_URL}/api/variants`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return req.data;
  }

  async getAll(id: string) {
    const req = await axios.get(`${BASE_URL}/api/variants/product/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return req.data;
  }
}
