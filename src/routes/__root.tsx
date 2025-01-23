import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link
          to="/event"
          search={{
            location: "Tours",
            eventName: "Touraine",
          }}
        >
          Event
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
