import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  async function renderApp() {
    await enableMocking();
    root.render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }

  renderApp();
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
