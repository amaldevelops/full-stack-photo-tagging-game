import Game from "../components/Game";
import Index from "../components/Index";
import ErrorPage from "../components/ErrorPage";

const Routes = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
];

export default Routes;
