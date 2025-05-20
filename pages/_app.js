import "../styles/globals.css";
import { AlertProvider } from "../context/alertContext";
import Toast from "../components/general/Toast";
import { ViewContextProvider } from "../context/viewContext";
import Nav from "../components/general/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AlertProvider>
        <ViewContextProvider>
          <Nav />
          <Toast />
          <Component {...pageProps} />
        </ViewContextProvider>
      </AlertProvider>
    </>
  );
}

export default MyApp;
