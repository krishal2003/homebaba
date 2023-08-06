import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Colors() {
  const [age, setAge] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 170 }}>
        <InputLabel id="demo-controlled-open-select-label">Colors</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label="Colors"
          onChange={handleChange}
        >
          <MenuItem value={12}>Red</MenuItem>
          <MenuItem value={11}>Black</MenuItem>
          <MenuItem value={10}>Orange</MenuItem>
          <MenuItem value={13}>Blue</MenuItem>
          <MenuItem value={14}>Green</MenuItem>
          <MenuItem value={15}>Pink</MenuItem>
          <MenuItem value={16}>Yellow</MenuItem>
          <MenuItem value={17}>Brown</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
