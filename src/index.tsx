import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";

const rootNode: Element = document.querySelector("#root")!;

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.createRoot(rootNode).render(<Index />);
