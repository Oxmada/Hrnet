import { useState } from "react";

function DataTable({ data }) {
    if (!data || data.length === 0) return <p>No data available</p>;

    const columns = Object.keys(data[0]);

    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const renderCell = (value) => {
        if (value === null || value === undefined) return "";
        if (typeof value === "object") {
            return value.name || value.label || JSON.stringify(value);
        }
        return value;
    };

    const filteredData = data.filter((row) =>
        columns.some((col) =>
            String(renderCell(row[col])).toLowerCase().includes(search.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = renderCell(a[sortConfig.key]) || "";
        const bValue = renderCell(b[sortConfig.key]) || "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    return (
        <div className="data-table">
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    {[5, 10, 20].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col}
                                onClick={() => handleSort(col)}
                            >
                                {col}{" "}
                                {sortConfig.key === col ? (
                                    sortConfig.direction === "asc" ? "▲" : "▼"
                                ) : ""}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, i) => (
                        <tr key={i}>
                            {columns.map((col) => (
                                <td key={col}>{renderCell(row[col])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DataTable;




