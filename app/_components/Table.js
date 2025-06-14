import PropTypes from 'prop-types'

function Table({ columns,
                   data,
                   isLoading,
                   emptyMessage,
                   className,
                   rowClassName,
                   headerClassName,
                   bodyClassName,
                   onRowClick,
                   maxHeight,
                   stickyHeader,
                   topHeaderChildren
               }) {

    const defaultMaxHeight = maxHeight || "calc(100vh-100px)";

    return (
        <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className || ''}`}>
            {/* Top Header Children */}
            {topHeaderChildren && (
                <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50/50">
                    {topHeaderChildren}
                </div>
            )}
            <div
                className={`overflow-x-auto ${stickyHeader !== false ? 'max-h-[' + defaultMaxHeight + ']' : ''} 
                [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2
                [&::-webkit-scrollbar-track]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:bg-zinc-100`}
            >
                <table className="relative min-w-full divide-y divide-zinc-200">
                    <thead className={`${stickyHeader !== false ? 'sticky top-0' : ''} bg-zinc-50 ${headerClassName || ''}`}>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={column.key || index}
                                className={`px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider ${column.headerClassName || ''}`}
                                style={column.width ? { width: column.width } : {}}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className={`bg-white divide-y divide-zinc-200 ${bodyClassName || ''}`}>
                    {isLoading && (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-4 text-center">
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                                </div>
                            </td>
                        </tr>
                    )}
                    {!isLoading && (!data || data.length === 0) && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-4 text-center text-zinc-500"
                            >
                                {emptyMessage || 'No data found'}
                            </td>
                        </tr>
                    )}
                    {!isLoading && data && data.length > 0 && data.map((row, rowIndex) => (
                        <tr
                            key={row.id || rowIndex}
                            className={`hover:bg-zinc-50 ${rowClassName || ''} ${onRowClick ? 'cursor-pointer' : ''}`}
                            onClick={() => onRowClick && onRowClick(row, rowIndex)}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={column.key || colIndex}
                                    className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                                >
                                    {column.render ? column.render(row[column.dataIndex], row, rowIndex) : row[column.dataIndex]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            dataIndex: PropTypes.string.isRequired,
            width: PropTypes.string,
            className: PropTypes.string,
            headerClassName: PropTypes.string,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    emptyMessage: PropTypes.string,
    className: PropTypes.string,
    rowClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    onRowClick: PropTypes.func,
    maxHeight: PropTypes.string,
    stickyHeader: PropTypes.bool,
};

Table.defaultProps = {
    data: [],
    isLoading: false,
    emptyMessage: 'No data found',
    stickyHeader: true,
    topHeaderChildren: null
};

export default Table