import "../styles/globals.css";
import "../styles/msg.css";
import "../styles/post.css";
import "../styles/profile.css";
import "../styles/newMsg.css";
import type { AppProps } from "next/app";

import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Layout/NavBar";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { pageAuth } from "../components/utils/access";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  pageAuth();
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
          dedupingInterval: 10000,
        }}
      >
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Navbar />
          <Component {...pageProps} />;
        </Provider>
      </SWRConfig>
    </>
  );
}
// export default MyApp;

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
