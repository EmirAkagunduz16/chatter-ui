import { API_URL } from "../constants/urls";

const useLogout = () => {
  const logout = async () => {
    // try {
    //   await fetch(`${API_URL}/auth/logout`, {
    //     method: "POST",
    //     credentials: "include",
    //   });
    // } catch (error) {
    //   console.error("Logout error:", error);
    //   // Continue with logout even if API call fails
    // }

    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to logout");
    }
  };

  return { logout };
};

export default useLogout;
