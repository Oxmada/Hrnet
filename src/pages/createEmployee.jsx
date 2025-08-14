function CreateEmployee() {
    return (
        <div>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <a href="employee-list.html" className="link">View Current Employees</a>
                <h2 className="subtitle">Create Employee</h2>
                <form id="create-employee">

                    <label htmlFor="first-name" className="label">First Name</label>
                    <input type="text" id="first-name" className="input-field" />

                    <label htmlFor="last-name" className="label">Last Name</label>
                    <input type="text" id="last-name" className="input-field" />

                    <label htmlFor="date-of-birth" className="label">Date of Birth</label>
                    <input id="date-of-birth" type="text" className="input-field" />

                    <label htmlFor="start-date" className="label">Start Date</label>
                    <input id="start-date" type="text" className="input-field" />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street" className="label">Street</label>
                        <input id="street" type="text" className="input-field" />

                        <label htmlFor="city" className="label">City</label>
                        <input id="city" type="text" className="input-field" />

                        <label htmlFor="state" className="label">State</label>
                        <select name="state" id="state" className="select-field"></select>

                        <label htmlFor="zip-code" className="label">Zip Code</label>
                        <input id="zip-code" type="number" className="input-field" />
                    </fieldset>

                    <label htmlFor="department" className="label">Department</label>
                    <select name="department" id="department" className="select-field">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                </form>

                <button className="btn">Save</button>
            </div>
            <div id="confirmation" className="confirmation">
                Employee Created!
            </div>
        </div>
    );
}

export default CreateEmployee;



