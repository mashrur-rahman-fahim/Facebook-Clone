import api from "../../api/axios";
import { Logout } from "../logout/Logout";

export const authentication = async () => {
  try {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      try {
        token = await renewAccessToken();

        if (!token) {
          await Logout();
          console.log("hi");
          return null;
        }
      } catch (error) {
        console.log(error);

        await Logout();
        return null;
      }
    }
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const user = await api.get("/api/user");

    return user.data.user;
  } catch (error) {
    console.log(error);
    try {
      const token = await renewAccessToken();
      if (!token) {
        await Logout();

        return null;
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const user = await api.get("/api/user");

      return user.data.user;
    } catch (error) {
      console.log(error);
      await Logout();

      return null;
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
