import Game from "../components/Game";
import Index from "../components/Index";

const Routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/game",
    element: <Game />,
  },
];

export default Routes;
