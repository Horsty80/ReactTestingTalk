import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterHistory,
  RouterProvider,
} from "@tanstack/react-router";
import { AppStore, RootState, setupStore } from "./store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store, userEvent, and all of RTL's query functions
  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function renderWithProviderAndRouter(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    initialEntries = [],
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren) => {
    const { router } = createTestRouter(children, createMemoryHistory({ initialEntries }));

    return (
      <Provider store={store}>
        <RouterProvider router={router as any} />
      </Provider>
    );
  };

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

function createTestRouter(children: React.ReactNode, initialHistory: RouterHistory) {
  const history = initialHistory ?? createMemoryHistory({ initialEntries: ["/"] });

  const rootRoute = createRootRoute({});
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => children,
  });

  const routeTree = rootRoute.addChildren([indexRoute]);

  const router = createRouter({ routeTree, history });

  return {
    router,
    routes: { indexRoute },
  };
}
