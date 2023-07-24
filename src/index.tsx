import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { createRoot } from "react-dom/client";
import App from "./App";

const store = setupStore();
createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
