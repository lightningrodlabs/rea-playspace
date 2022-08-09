import { SlCard, SlInput, SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { GeoDataShape } from '../../types/valueflows';
import { slChangeConstructor } from '../util';

interface Props {
  label: string;
  name: string;
  value: GeoDataShape;
  onChange: (measurement: any) => void;
  disabled?: boolean;
}

const LocationInput: React.FC<Props> = ({label, name, value, onChange, disabled}) => {
  const [{type, name: locationName, address, point}, setState] = useState<GeoDataShape>(
    {...{type: ''}, ...value}
  );

  const setAddress = () => {
    setState((prevState) => {
      return {...prevState, type: 'address'};
    })
  }

  const setNamedLocation = () => {
    setState((prevState) => {
      return {...prevState, type: 'named'};
    })
  }

  const setPoint = () => {
    setState((prevState) => {
      return {...prevState, type: 'point'};
    })
  }

  useEffect(() => {
    if (value != null) {
      setState(value);
    }
  }, [value]);

  const parsers = {
    'hasNumericalValue': (value: string) => parseFloat(value)
  }

  const onSlChange = slChangeConstructor<GeoDataShape>(name, onChange, setState, parsers);

  // TODO: validate the geo point and parse it out into lat long
  const formControls = () => {
    switch(type) {
      case 'address':
        return <>
        <SlInput disabled={disabled} label="Address" name="address" value={address ? address : ''} onSlInput={onSlChange}></SlInput>
        </>;
      case 'named':
        return <>
        <SlInput disabled={disabled} label="Location name" name="name" value={locationName ? locationName : ''} onSlInput={onSlChange}></SlInput>
        </>
      case 'point':
        return <>
        <SlInput disabled={disabled} label="Address" name="point" value={point ? point as string : ''} onSlInput={onSlChange}></SlInput>
        </>
    }
  }

  return (
      <>
        <SlCard>
          <label>{`${label}`}</label>
          <SlRadioGroup label="Select a Location type">
            <SlRadio disabled={disabled} name="option" value="1" onClick={setAddress} checked={type == 'address'}>
              Address
            </SlRadio>
            <SlRadio disabled={disabled} name="option" value="2" onClick={setNamedLocation} checked={type == 'named'}>
              Named Location
            </SlRadio>
            <SlRadio disabled={disabled} name="option" value="3" onClick={setPoint} checked={type == 'point'}>
              Lat/Long
            </SlRadio>
          </SlRadioGroup>
          <div>
            <br/>
            {formControls()}
          </div>
        </SlCard>
      </>
  );
};

export default LocationInput;
