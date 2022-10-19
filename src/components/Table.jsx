import React from 'react';

function Table({ columns = [], data = [] }) {
  const [headers, keys] = React.useMemo(() => {
    return columns.reduce(
      (prev, { label, key }) => {
        prev[0].push(label);
        prev[1].push(key);
        return prev;
      },
      [[], []]
    );
  }, [columns]);

  return (
    <table className="table table-bordered table-sm">
      <TableHeader headers={headers} />
      <TableRows rows={data} columns={keys} />
    </table>
  );
}

const TableHeader = React.memo(({ headers = [] }) => {
  return (
    <thead>
      <tr>
        {headers.map((headerLabel) => (
          <th key={headerLabel}>{headerLabel}</th>
        ))}
      </tr>
    </thead>
  );
});

const TableRows = React.memo(({ rows = [], columns = [] }) => {
  return (
    <thead>
      {rows.map((row, idx) => (
        <tr key={idx}>
          {columns.map((column, idx) => (
            <td key={column}>{row[column]}</td>
          ))}
        </tr>
      ))}
    </thead>
  );
});

export default React.memo(Table);
