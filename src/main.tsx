import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { ContextProvider } from "./Context/index.tsx";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ContextProvider>
      <Routes />
    </ContextProvider>
    <ToastContainer />
  </>
);
