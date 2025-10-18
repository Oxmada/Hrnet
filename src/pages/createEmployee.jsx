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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            firstName,
            lastName,
            birthDate: birthDate ? birthDate.toISOString().split("T")[0] : null,
            startDate: startDate ? startDate.toISOString().split("T")[0] : null,
            street,
            city,
            state,
            zipCode,
            department,
        };

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
                    <label htmlFor="first-name" className="label">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        className="input-field"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label htmlFor="last-name" className="label">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        className="input-field"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor="date-of-birth" className="label">Date of Birth</label>
                    <CustomDatePicker
                        id="date-of-birth"
                        selectedDate={birthDate}
                        onChange={setBirthDate}
                    />

                    <label htmlFor="start-date" className="label">Start Date</label>
                    <CustomDatePicker
                        id="start-date"
                        selectedDate={startDate}
                        onChange={setStartDate}
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street" className="label">Street</label>
                        <input
                            id="street"
                            type="text"
                            className="input-field"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />

                        <label htmlFor="city" className="label">City</label>
                        <input
                            id="city"
                            type="text"
                            className="input-field"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <label htmlFor="state" className="label">State</label>
                        <CustomSelect
                            options={states}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.abbreviation}
                            placeholder="Select a state"
                            onChange={setState}
                        />

                        <label htmlFor="zip-code" className="label">Zip Code</label>
                        <input
                            id="zip-code"
                            type="number"
                            className="input-field"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </fieldset>

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










