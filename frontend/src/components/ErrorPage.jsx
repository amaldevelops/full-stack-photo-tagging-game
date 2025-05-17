import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>
        Route not found, please go back <Link to="/">Home</Link>
      </h1>
    </div>
  );
}

export default ErrorPage;
