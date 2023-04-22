export function Table({ children }: { children: React.ReactNode }) {
  return <table>{children}</table>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <th>{children}</th>;
}

export function TableData({ children }: { children: React.ReactNode }) {
  return <td>{children}</td>;
}

export function TableExample() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kingdom Prosperity</TableHead>
            <TableHead>Citizen Happiness</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>Empty</TableData>
            <TableData>Overflowing</TableData>
          </TableRow>
          <TableRow>
            <TableData>Modest</TableData>
            <TableData>Satisfied</TableData>
          </TableRow>
          <TableRow>
            <TableData>Full</TableData>
            <TableData>Ecstatic</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
