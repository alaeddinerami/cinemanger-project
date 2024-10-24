import {jwtDecode} from "jwt-decode";

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    return decodedToken; 
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
