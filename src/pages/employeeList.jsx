import { useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import "../styles/pages/EmployeeList.scss";

function EmployeeList() {
    const employees = useSelector((state) => state.employees);

    return (
        <div className="employee-list">
            <h2 className="title">Current Employees</h2>
            <div className="container">
                <DataTable data={employees} />
            </div>
        </div>
    );
}

export default EmployeeList;

