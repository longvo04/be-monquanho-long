import React from "react";
import RouterUser from "./user/routes/RouterUser";
import Routeradmin from "./admin/routes/Routeradmin";

function App() {
  const role = localStorage.getItem("role");
  if (role === "admin") return <Routeradmin />;
  return <RouterUser />;
}

export default App;
