import { useState } from "react";

function DataTable({
    data,
    searchable = true,
    sortable = true,
    paginated = true,
    rowsPerPageOptions = [5, 10, 20],
    defaultRowsPerPage = 5,
    className = "",
}) {
    if (!data || data.length === 0) return <p>No data available</p>;

    const columns = Object.keys(data[0]);

    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const renderCell = (value) => {
        if (value === null || value === undefined) return "";
        if (typeof value === "object") {
            return value.name || value.label || JSON.stringify(value);
        }
        return value;
    };

    const filteredData = searchable
        ? data.filter((row) =>
            columns.some((col) =>
                String(renderCell(row[col])).toLowerCase().includes(search.toLowerCase())
            )
        )
        : data;

    const sortedData = sortable
        ? [...filteredData].sort((a, b) => {
            if (!sortConfig.key) return 0;
            const aValue = renderCell(a[sortConfig.key]) || "";
            const bValue = renderCell(b[sortConfig.key]) || "";
            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        })
        : filteredData;

    const handleSort = (key) => {
        if (!sortable) return;
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = paginated
        ? sortedData.slice(startIndex, startIndex + rowsPerPage)
        : sortedData;
    const totalPages = paginated ? Math.ceil(sortedData.length / rowsPerPage) : 1;

    return (
        <div className={`data-table ${className}`}>
            <div className="controls">
                {searchable && (
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                )}

                {paginated && (
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {rowsPerPageOptions.map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col}
                                scope="col"
                                aria-sort={sortConfig.key === col ? sortConfig.direction : "none"}
                                onClick={() => handleSort(col)}
                            >
                                {col}{" "}
                                {sortConfig.key === col ? (
                                    sortConfig.direction === "asc" ? "▲" : "▼"
                                ) : (
                                    ""
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, i) => (
                        <tr key={row.id || row.key || i}>
                            {columns.map((col) => (
                                <td key={col}>{renderCell(row[col])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {paginated && (
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
            )}
        </div>
    );
}

export default DataTable;
export { DataTable };





