import React, { useEffect, Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import usePageTitle from "./pagetitle";
import MainRoutes from "./MainRoutes";
import ComponentLoader from "../Components/ComponentLoader/ComponentLoader"; 

export default function ApplicationRoutes() {
  const routes = useRoutes(MainRoutes);
  const { pathname } = useLocation();

  usePageTitle("Infinity HR");


  return (
    <Suspense fallback={<ComponentLoader />}>
      <div className="App">{routes}</div>
    </Suspense>
  );
}
