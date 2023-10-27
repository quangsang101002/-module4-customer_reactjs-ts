import React, { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GlobalStyle.scss";

function GlobalStyle({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default GlobalStyle;
