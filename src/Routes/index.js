import React, { lazy, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";

import MainRoute from "./MainRoutes";



export default function ApplicationRoutes() {
  const routes = useRoutes([...MainRoute]);
  const {pathname} = useLocation()


  useEffect(() => {
    
  }, []);
  return (
    <div className="App">
      {routes}
    </div>
  );
}





