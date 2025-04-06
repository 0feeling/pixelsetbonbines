import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom"; // Utilise Router ici pour englober App
import App from "./App"; // App contient la logique des routes

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    {" "}
    {/* On englobe toute l'application avec Router */}
    <App /> {/* App contient toutes les routes */}
  </Router>
);
