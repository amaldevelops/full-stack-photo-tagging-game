import { useNavigate, Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>Route not found, please go back</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default ErrorPage;
