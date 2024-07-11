import { HtmlHTMLAttributes, ReactNode } from "react";
import "./Table.scss";
import { EmptyData } from "..";

type DataType = Record<any, any>;

interface ITableProps<T> extends HtmlHTMLAttributes<HTMLTableElement> {
  head: string[];
  data: T[];
  renderItem?: (item: T, index: number) => ReactNode;
}

interface ITableRowProps extends HtmlHTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}
interface ITableColProps extends HtmlHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function Table<T extends DataType>({
  data,
  renderItem,
  head,
  ...props
}: ITableProps<T>) {
  renderItem = renderItem || renderTableItem;

  return data.length === 0 ? (
    <EmptyData name="Nothing To Show." />
  ) : (
    <div className="table-wrapper">
      <div className="table-header">
        {/* <div className="">
          <label htmlFor="table-search">
            <input type="text" placeholder="Search" id="table-search" />
          </label>
        </div> */}
      </div>
      <div className="table-content">
        <table className="table" {...props}>
          <thead className="table-head">
            <tr>
              {head.map((name) => (
                <th className="table-col" key={name}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="table-body">{data.map(renderItem)}</tbody>
        </table>
      </div>
    </div>
  );
}

export function Row({ children, ...props }: ITableRowProps) {
  return (
    <tr className="table-row" {...props}>
      {children}
    </tr>
  );
}

export function Col({ children, ...props }: ITableColProps) {
  return (
    <td className="table-col" {...props}>
      {children}
    </td>
  );
}

function renderTableItem<T extends DataType>(
  item: T,
  index: number
): ReactNode {
  return (
    <Row key={index}>
      {Object.keys(item).map((key, index) => (
        <Col key={index}>{item[key]}</Col>
      ))}
    </Row>
  );
}
