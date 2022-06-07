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
  const [{hasNumericalValue, hasUnit}, setState] = useState({...initialState, ...value});

  useEffect(() => {
    // Set the default units when the resource specification has them and the current *Quantities are null
    if (value === null) {
      console.log(`${label} is null`)
    }
  });

  const onSlChange = (e: any) => {
    const { field_name, field_value } = e.target;
    setState(prevMeasurement => {
      const measurement = { ...prevMeasurement, [field_name]: field_value };
      onChange({target: {name, value: measurement}});
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
          <SlInput className="measurementValue" label={`${label} quantity`} type="number" name="resourceValue" onSlInput={onSlChange} value={hasNumericalValue.toString()}></SlInput>
          <span className='measurementSpacer'></span>
          <SlSelect className="measurementUnit" label={`${label} unit`} name="resourceUnit" onSlChange={onSlChange} value={hasUnit}>
            {units.map((unit) => (<SlMenuItem key={`unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>
  );
}

export default MeasurementInput;
