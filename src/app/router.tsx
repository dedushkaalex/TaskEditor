import { createBrowserRouter } from "react-router";

import App from "./app";
import { Providers } from "./providers";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        index: true,
        lazy: () => import("@/features/challenge/challenge.page.tsx"),
      },
    ],
  },
]);
