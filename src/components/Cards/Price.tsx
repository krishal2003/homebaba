import React, { useState } from 'react';
import { Slider, Typography } from '@mui/material';

const Price = () => {
  const [value, setValue] = useState<[number, number]>([1500, 4000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number]);
  };

  return (
    <div>
      <Typography
        id="range-slider"
        gutterBottom
        sx={{ color: 'GrayText', pb: 4, textAlign: 'center' }}
      >
        Price Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        min={1500}
        max={4000}
        sx={{ width: '200px' }}
      />
    </div>
  );
};

export default Price;
