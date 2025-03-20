import api from "../../api/axios";
import { Logout } from "../logout/Logout";

export const authentication = async () => {
  try {
    const token = localStorage.getItem("accessToken");
   
   
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const user = await api.get("/api/user");

    return user.data.user;
  } catch (error) {
    try {
      const token=await renewAccessToken();
      localStorage.setItem("accessToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const user = await api.get("/api/user");

    return user.data.user;
    } catch (error) {
      console.log(error);
      Logout();
      
    }
    
  }
};
const renewAccessToken = async () => {
  try {
    const res = await api.get("/auth/refresh-token", { withCredentials: true });
    const token = res.data.accessToken;
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};