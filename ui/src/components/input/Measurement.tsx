import { SlInput, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { Measurement } from '../../data/models/Valueflows/Knowledge';
import { MeasurementShape, UnitShape } from '../../types/valueflows';

interface Props {
  label: string;
  name: string;
  defaultUnit: string;
  value: MeasurementShape;
  units: UnitShape[];
  onChange: (measurement: any) => void;
}

const MeasurementInput: React.FC<Props> = ({label, name, defaultUnit, value, units, onChange}) => {
  const [{hasNumericalValue, hasUnit}, setState] = useState<MeasurementShape>(new Measurement(
    {
      hasNumericalValue: defaultUnit ? 0 : '',
      hasUnit: defaultUnit ? defaultUnit : ''
    } as MeasurementShape)
  );

  useEffect(() => {
    if (value != null && value.hasNumericalValue && value.hasNumericalValue != '' && value.hasUnit && value.hasUnit != '') {
      setState(value);
    }
  }, [value]);

  const deferOnChange = (value: MeasurementShape) => {
    setTimeout(() => {
      onChange({target: {name, value}})
    }, 1);
  };

  const toString = (value: number | string): string => {
    if (typeof value == 'number') {
      return value.toString();
    }
    return value;
  }

  const onSlChange = (e: any) => {
    const { name: fieldName, value } = e.target;
    setState(prevMeasurement => {
      let parsedValue = value;
      if (fieldName == 'hasNumericalValue') {
        if (value == '') {
          parsedValue = value;
        } else {
          parsedValue = parseFloat(value);
        }
      }
      const measurement = { ...prevMeasurement, [fieldName]: parsedValue };
      if (measurement.hasNumericalValue && measurement.hasNumericalValue != '' && measurement.hasUnit && measurement.hasUnit != '') {
        deferOnChange(measurement);
      } else {
        deferOnChange(null);
      }
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
          <SlInput className="measurementValue" label={`${label} quantity`} type="number" name="hasNumericalValue" onSlInput={onSlChange} value={(toString(hasNumericalValue))} clearable></SlInput>
          <span className='measurementSpacer'></span>
          <SlSelect className="measurementUnit" label={`${label} unit`} name="hasUnit" onSlChange={onSlChange} value={hasUnit} clearable>
            {units.map((unit) => (<SlMenuItem key={`unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>
  );
};

export default MeasurementInput;
