import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export async function loginAccount(username: string, password: string) {
  try {
    const response = await axios.post("api/auth/login", { username, password });
    return await response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function logoutAccount() {
  const response = await axios.get("api/auth/logout");
  console.log(response);
}
