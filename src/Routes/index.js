import React, { lazy, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import usePageTitle from "./pagetitle";
import MainRoute from "./MainRoutes";



export default function ApplicationRoutes() {
  const routes = useRoutes([...MainRoute]);
  const {pathname} = useLocation()
  usePageTitle(" Infinity HR")

  useEffect(() => {
    
  }, []);
  return (
  
    <div className="App">
      {routes}
    </div>
  );
}





