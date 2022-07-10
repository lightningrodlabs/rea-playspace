import { SlInput, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { Measurement } from '../../data/models/Valueflows/Knowledge';
import { MeasurementShape, UnitShape } from '../../types/valueflows';
import { NumberToString, slChangeConstructor } from '../util';

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

  const parsers = {
    'hasNumericalValue': (value: string) => parseFloat(value)
  }

  const validator = (m: MeasurementShape) => {
    return m.hasNumericalValue && m.hasNumericalValue != '' && m.hasUnit && m.hasUnit != '';
  };

  const onSlChange = slChangeConstructor<MeasurementShape>(name, onChange, setState, parsers, validator);

  /**
   * TIL: valueAsNumber does not cause the the value to display.
   * This might be because of how we're using shoelace. /me shrugs
   */
  return (
      <>
        <div className='measurementInput'>
          <SlInput className="measurementValue" label={`${label} quantity`} type="number" name="hasNumericalValue" onSlInput={onSlChange} value={(NumberToString(hasNumericalValue))} clearable></SlInput>
          <span className='measurementSpacer'></span>
          <SlSelect className="measurementUnit" label={`${label} unit`} name="hasUnit" onSlChange={onSlChange} value={hasUnit} clearable>
            {units.map((unit) => (<SlMenuItem key={`unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>
  );
};

export default MeasurementInput;
