import { Suspense, lazy } from "react";
import { Loading } from "../components/Loading/Loading";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
const ListTicket = lazy(() => import('../pages/tickets/index'));

export const appRouters = createBrowserRouter([
  {
    path: "/",
    element:
    <Layout>
      <Suspense fallback={<Loading />}>
        <ListTicket />
      </Suspense>,
    </Layout>
  },
]);
