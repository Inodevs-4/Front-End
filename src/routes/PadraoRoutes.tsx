import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import Login from "../pages/Login";

function ColaboradorRoutes() {
    return(
    <BrowserRouter>
      <Switch>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Switch>
    </BrowserRouter>
    )
}

export default ColaboradorRoutes