import { Suspense, lazy } from "react";
import { Loading } from "../components/Loading/Loading";
import { createBrowserRouter } from "react-router-dom";
const ListTicket = lazy(() => import('../pages/tickets/index'));

export const appRouters = createBrowserRouter([
  {
    path: "/",
    element: 
    <Suspense fallback={<Loading />}>
      <ListTicket />
    </Suspense>,
  },
]);
