import styled from "styled-components";

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.surface};
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    padding: 12px 16px;

    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: ${({ theme }) => theme.typography.subHeadingWeight};
    text-align: left;
`;

const TableCell = styled.td`
    padding: 12px 16px;

    color: ${({ theme }) => theme.colors.text};

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    font-size: ${({ theme }) => theme.typography.body};
`;

const TableRow = styled.tr`
    &:hover {
        background: ${({ theme }) => theme.colors.surfaceHover};
    }

    &:last-child td {
        border-bottom: none;
    }
`;

function Table({ columns = [], data = [], renderRow }) {
    return (
        <TableWrapper>
            <StyledTable>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <TableHeader key={column.key}>
                                {column.label}
                            </TableHeader>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <TableRow key={item.id ?? index}>
                            {renderRow(item, TableCell)}
                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
        </TableWrapper>
    );
}

export default Table;