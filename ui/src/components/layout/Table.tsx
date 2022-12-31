import React from "react";
import { Pathed } from "data-providers";
import TableRow from './TableRow';
import { Dictionary } from "typed-object-tweezers";

export type Props = {
  datas: Array<Pathed<{id: string}>>,
  fieldDescriptors: Dictionary<string>,
  syntheticFields?: Record<string, (data: Pathed<{id: string}>) => any>,
  fieldDecorators?: Record<string, (data: any) => JSX.Element>
};

const Table: React.FC<Props> = ({datas, fieldDescriptors, syntheticFields, fieldDecorators}) => {

  const headings: JSX.Element[] = Object.values(fieldDescriptors).map((heading: string, index: number) => <th key={`${heading}-${index}`}>{heading}</th>)

  const rows: JSX.Element[] = datas.map((data: Pathed<{id: string}>) => {
    return(<TableRow
      key={data.id}
      data={data}
      fields={Object.keys(fieldDescriptors)}
      syntheticFields={syntheticFields}
      fieldDecorators={fieldDecorators}>
      </TableRow>
    );
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            {headings}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}

export default Table;