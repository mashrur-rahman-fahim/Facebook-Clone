import api from "../../api/axios";

export const Logout = async () => {
    
try {
     const res= await api.post("/auth/logout",{}, { withCredentials: true });
   
     localStorage.removeItem("accessToken");
      delete api.defaults.headers.common["Authorization"];
} catch (error) {
     console.error(error);
     return null;
    
}
};
