import axios from "axios";
import { useRouter } from "next/router";
import { ToastFailure } from "./alert";

//

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const logout = async () => {
  await axios.post("/api/logout");
  localStorage.removeItem("user");
  window.location.href = "/auth/login";
};

const pageAuth = async () => {
  const router = useRouter();
  const unprotectedRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/[username]",
    "/chat/posts/[singlepost]",
  ];

  let checkPage =
    unprotectedRoutes.filter((c: any) => {
      return router.pathname === c;
    }).length > 0;

  if (!checkPage) {
    try {
      const { data } = await axios.get(`/api/user/me`, {
        withCredentials: true,
        headers: { crossDomain: true, "Content-Type": "application/json" },
      });

      if (data) {
        return;
      }
    } catch (error: any) {
      if (error && error.status === 401) {
        ToastFailure(error.data.message);
        localStorage.removeItem("user");
        router.push("/");
      }
    }
  }
};

export { logout, pageAuth };
