import { SlInput, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { Measurement } from '../../data/models/Valueflows/Knowledge';
import { MeasurementShape, UnitShape } from '../../types/valueflows';

interface Props {
  label: string;
  name: string;
  value: MeasurementShape;
  units: UnitShape[];
  onChange: (measurement: any) => void;
}

const initialState: MeasurementShape = new Measurement();

const MeasurementInput: React.FC<Props> = ({label, name, value, units, onChange}) => {
  const [{hasNumericalValue, hasUnit}, setState] = useState({...initialState});

  useEffect(() => {
    setState(prevState => ({ ...prevState, ...value }));
  }, [value]);

  const deferOnChange = (value: MeasurementShape) => {
    setTimeout(() => {
      onChange({target: {name, value}})
    }, 1);
  };

  const onSlChange = (e: any) => {
    const { name: fieldName, value } = e.target;
    setState(prevMeasurement => {
      let parsedValue = value;
      if (fieldName == 'hasNumericalValue') {
        parsedValue = parseFloat(value);
      }
      const measurement = { ...prevMeasurement, [fieldName]: parsedValue };
      deferOnChange(measurement);
      return measurement;
    });
  };

  /**
   * TIL: valueAsNumber does not cause the the value to display.
   * This might be because of how we're using shoelace. /me shrugs
   */
  return (
      <>
        <div className='measurementInput'>
          <SlInput className="measurementValue" label={`${label} quantity`} type="number" name="hasNumericalValue" onSlInput={onSlChange} value={hasNumericalValue.toString()}></SlInput>
          <span className='measurementSpacer'></span>
          <SlSelect className="measurementUnit" label={`${label} unit`} name="hasUnit" onSlChange={onSlChange} value={hasUnit}>
            {units.map((unit) => (<SlMenuItem key={`unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>
  );
};

export default MeasurementInput;
