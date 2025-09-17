import { useSelector } from "react-redux";
import DataTable from "../components/DataTable";

function EmployeeList() {
    const employees = useSelector((state) => state.employees);

    console.log("Employees from store:", employees);

    return (
        <div>
            <h2>Current Employees</h2>
            <DataTable data={employees} />
        </div>
    );
}

export default EmployeeList;
