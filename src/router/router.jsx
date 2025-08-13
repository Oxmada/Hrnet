import { Routes, Route } from "react-router-dom";
import CreateEmployee from "../pages/createEmployee";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<CreateEmployee />} />
        </Routes>
    );
}

export default Router;

