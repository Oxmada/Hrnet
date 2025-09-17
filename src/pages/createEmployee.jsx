import { useState } from "react";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomSelect from "../components/CustomSelect";
import CustomModal from "../components/CustomModal";
import { states } from "../data/states";
import { departments } from "../data/departments";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";
import { Link } from "react-router-dom";

function CreateEmployee() {
    const [birthDate, setBirthDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [department, setDepartment] = useState(null);
    const [state, setState] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            birthDate: birthDate ? birthDate.toISOString().split("T")[0] : null,
            startDate: startDate ? startDate.toISOString().split("T")[0] : null,
            street: document.getElementById("street").value,
            city: document.getElementById("city").value,
            state,
            zipCode: document.getElementById("zip-code").value,
            department,
        };

        console.log("Dispatching newEmployee:", newEmployee);
        dispatch(addEmployee(newEmployee));
        setModalOpen(true);
    };

    return (
        <div>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employee-list" className="link">View Current Employees</Link>
                <h2 className="subtitle">Create Employee</h2>

                <form id="create-employee" onSubmit={handleSubmit}>
                    {/* First name */}
                    <label htmlFor="first-name" className="label">First Name</label>
                    <input type="text" id="first-name" className="input-field" />

                    {/* Last name */}
                    <label htmlFor="last-name" className="label">Last Name</label>
                    <input type="text" id="last-name" className="input-field" />

                    {/* Birth Date */}
                    <label htmlFor="date-of-birth" className="label">Date of Birth</label>
                    <CustomDatePicker
                        id="date-of-birth"
                        selectedDate={birthDate}
                        onChange={setBirthDate}
                    />

                    {/* Start Date */}
                    <label htmlFor="start-date" className="label">Start Date</label>
                    <CustomDatePicker
                        id="start-date"
                        selectedDate={startDate}
                        onChange={setStartDate}
                    />

                    {/* Address */}
                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street" className="label">Street</label>
                        <input id="street" type="text" className="input-field" />

                        <label htmlFor="city" className="label">City</label>
                        <input id="city" type="text" className="input-field" />

                        {/* State Select */}
                        <label htmlFor="state" className="label">State</label>
                        <CustomSelect
                            options={states}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.abbreviation}
                            placeholder="Select a state"
                            onChange={setState}
                        />

                        <label htmlFor="zip-code" className="label">Zip Code</label>
                        <input id="zip-code" type="number" className="input-field" />
                    </fieldset>

                    {/* Department Select */}
                    <label htmlFor="department" className="label">Department</label>
                    <CustomSelect
                        options={departments}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        placeholder="Select a department"
                        onChange={setDepartment}
                    />

                    <button type="submit" className="btn">Save</button>
                </form>
            </div>

            {/* Modal de confirmation */}
            <CustomModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Success"
            >
                Employee Created!
            </CustomModal>
        </div>
    );
}

export default CreateEmployee;









