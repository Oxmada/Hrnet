function DataTable({ data }) {
    if (!data || data.length === 0) return <p>No data available</p>;

    const columns = Object.keys(data[0]);

    const renderCell = (value) => {
        if (value === null || value === undefined) return "";
        if (typeof value === "object") {
            // Essaye d'afficher une propriété identifiable
            return value.name || value.label || JSON.stringify(value);
        }
        return value;
    };

    return (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {columns.map((col) => (
                            <td key={col}>{renderCell(row[col])}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;


