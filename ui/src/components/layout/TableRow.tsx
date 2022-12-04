import React from "react";
import { Pathed } from "data-providers";
import { useNavigate } from "react-router-dom";

export type Props = {
  data: Pathed<{id: string}>,
  fields: Array<string>,
  syntheticFields?: Record<string, (data :Pathed<{id: string}>) => {}>,
  fieldDecorators?: Record<string, (data: any) => JSX.Element>
};

const TableRow: React.FC<Props> = ({data, fields, syntheticFields, fieldDecorators}) => {

  const navigate = useNavigate();

  const synthesizeField = (field: string, data: Pathed<{id: string}>): any => {
    if (syntheticFields && syntheticFields[field] && syntheticFields[field] instanceof Function) {
      return syntheticFields[field](data);
    } else {
      return data[field];
    }
  }

  const decorateField = (field: string, element: any): JSX.Element => {
    if (fieldDecorators && fieldDecorators[field] && fieldDecorators[field] instanceof Function) {
      return fieldDecorators[field](element);
    } else {
      return <>{element}</>;
    }
  }

  return (
    <>
      <tr>
        {fields.map((field) => <td key={field}>{decorateField(field, synthesizeField(field, data))}</td>)}
      </tr>
    </>
  );
}

export default TableRow;