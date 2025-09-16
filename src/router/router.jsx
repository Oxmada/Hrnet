import { Routes, Route } from "react-router-dom";
import CreateEmployee from "../pages/createEmployee";
import EmployeeList from "../pages/employeeList";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<CreateEmployee />} />
            <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
    );
}

export default Router;


