import { SlInput, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import {  MeasurementShape, UnitShape, Measurement } from 'valueflows-models';
import { slChangeConstructor } from '../util';

interface Props {
  label: string;
  name: string;
  defaultUnit: string;
  value: MeasurementShape;
  units: UnitShape[];
  onChange: (measurement: any) => void;
  disableUnit?: boolean;
}

const MeasurementInput: React.FC<Props> = ({label, name, defaultUnit, value, units, onChange, disableUnit}) => {
  const [{hasNumericalValue, hasUnit}, setState] = useState<MeasurementShape>(new Measurement(
    {
      hasNumericalValue: 0,
      hasUnit: defaultUnit ? defaultUnit : ''
    } as MeasurementShape)
  );

  useEffect(() => {
    if (value != null && value.hasNumericalValue && value.hasUnit && value.hasUnit != '') {
      setState(value);
    }
  }, []);

  const parsers = {
    'hasNumericalValue': (value: string) => parseFloat(value)
  }

  const validator = (m: MeasurementShape) => {
    return Number.isFinite(m.hasNumericalValue) && m.hasUnit && m.hasUnit != '';
  };

  const onSlChange = slChangeConstructor<MeasurementShape>(name, onChange, setState, parsers, validator);

  /**
   * TIL: valueAsNumber does not cause the the value to display.
   * This might be because of how we're using shoelace. /me shrugs
   */
  return (
      <>
        <div className='measurementInput'>
          <SlInput className="measurementValue" label={`${label} quantity`} type="number" name="hasNumericalValue" clearable onSlInput={onSlChange} valueAsNumber={hasNumericalValue} value={hasNumericalValue.toString()}></SlInput>
          <span className='measurementSpacer'></span>
          <SlSelect disabled={disableUnit} className="measurementUnit" label={`${label} unit`} name="hasUnit" onSlChange={onSlChange} clearable value={hasUnit}>
            {units.map((unit) => (<SlMenuItem key={`unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
          </SlSelect>
        </div>
      </>
  );
};

export default MeasurementInput;
