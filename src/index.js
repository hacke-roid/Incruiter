// import { Router } from 'express'
import React from "react";
import { createRoot } from "react-dom/client";
import Routers from "./Router";
import { MyProvider } from "./UseContext/MyProvider";

createRoot(document.getElementById("root")).render(
  <MyProvider>
    <Routers />
  </MyProvider>
);
