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
  const componentName = name;

  const onSlChange = (e: any) => {
    const { name, value } = e.target;
    setState(prevMeasurement => {
      if (name == 'hasNumericalValue') {
        const measurement = { ...prevMeasurement, [name]: parseFloat(value) };
        setTimeout(() => {
          onChange({target: {name: componentName, value: measurement}})
        }, 1);
        return measurement;
      } else {
        const measurement = { ...prevMeasurement, [name]: value };
        setTimeout(() => {
          onChange({target: {name: componentName, value: measurement}})
        }, 1);
        return measurement;
      }
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
}

export default MeasurementInput;
