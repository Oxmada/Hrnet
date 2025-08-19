import Select from "react-select";

function CustomSelect({ options, getOptionLabel, getOptionValue, placeholder, onChange }) {
    return (
        <Select
            options={options}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            onChange={onChange}
            placeholder={placeholder}
            className="select-field"
        />
    );
}

export default CustomSelect;
