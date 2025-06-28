import { createBrowserRouter } from "react-router";

import App from "./app";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        lazy: () => import("@/features/challenge/challenge.page.tsx"),
      },
    ],
  },
]);
