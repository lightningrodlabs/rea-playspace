/**
 * This is so React doesn't complain about updating a value mid render
 */
export function deferOnChange<T> (name: string, value: T, onChange: ({}) => void) {
  setTimeout(() => {
    onChange({target: {name, value}})
  }, 1);
};

/**
 * Creates an onSlChange event lister
 */
export function slChangeConstructor<T> (
  // The name of value to update.
  name: string,
  // Callback function that sets the value one level above.
  onChange: ({}) => void,
  // React state helper
  setState: ({}) => void,
  // Parsers to convert the input text into the internally stored value.
  parsers?: {},
  // An all or nothing validator. Used for composite field inputs like resourceQuantity.
  validator?: ({}) => boolean
) {
  const onSlChange = (e: any) => {
    const { name: fieldName, value } = e.target;
    setState(prevState => {
      let parsedValue = value;
      if (parsedValue && parsedValue != '') {
        if (parsers && parsers[fieldName]) {
          parsedValue = parsers[fieldName](parsedValue);
        }
      }
      const state = { ...prevState, [fieldName]: parsedValue };

      // If we have a validator
      if (validator) {
        // and it validates our state, propagate the state upward.
        if (validator(state)) {
          deferOnChange<T>(name, state, onChange);
        // if it doesn't validate, return null
        } else {
          deferOnChange<T>(name, null, onChange);
        }
      // With no validator, just propagate the current state
      } else {
        deferOnChange<T>(name, state, onChange);
      }
      return state;
    });
  };
  return onSlChange;
}

function padBy2 (n: number): string {
  const num = n.toString();
  const len = num.length;
  let pad = '';
  for (let i = 0; i < (2 - len); i ++) {
    pad += '0';
  }
  return pad + num;
}

function getDateParts (dt: Date) {
  const y = dt.getFullYear();
  const M = padBy2(dt.getMonth()+1); // Date's getMonth() is zero based 
  const d = padBy2(dt.getDate())
  const h = padBy2(dt.getHours());
  const m = padBy2(dt.getMinutes());
  return {y, M, d, h, m };
}

/** 
 * Convert a Date to a weird ISO string
 * 
 * This is to get rid of the error:
 *   The specified value "*" does not conform to the required format. The format
 *   is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".
 */
export const DateToInputValueString = (dt: Date): string => {
  if (dt instanceof Date) {
    const { y, M, d, h, m } = getDateParts(dt);
    return `${y}-${M}-${d}T${h}:${m}`;
  } else {
    throw new Error("Date is somehow not a Date");
  }
}

export const DateToUiString = (dt: Date): string => {
  const { y, M, d, h, m } = getDateParts(dt);
  return `${y}/${M}/${d} ${h}:${m}`;
}

/**
 * Coerce to string if needed
 */
export const NumberToString = (value: number | string): string => {
  if (typeof value == 'number') {
    return value.toString();
  }
  return value;
}
