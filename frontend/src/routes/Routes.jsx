import Game from "../components/Game";
import Index from "../components/Index";
import ErrorPage from "../components/ErrorPage";

const Routes = [
  {
    path: "/full-stack-photo-tagging-game",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/full-stack-photo-tagging-game/game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
];

export default Routes;
