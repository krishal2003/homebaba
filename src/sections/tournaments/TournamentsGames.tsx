import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

function CloseIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <Box sx={{ pr: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
        />
      </svg>
    </Box>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const games = [
  'Valorant',
  'CS GO',
  'PUBG',
  'FIFA 23',
  'Fortnite',
  'Spiderman Miles Morales',
  'FIFA 22',
  'Freefire',
];

function getStyles(name: string, selectedGames: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedGames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TournamentsGames() {
  const theme = useTheme();
  const [selectedGames, setSelectedGames] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedGames>) => {
    const {
      target: { value },
    } = event;
    setSelectedGames(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRemoveGame = (game: string) => {
    setSelectedGames((prevSelectedGames) => prevSelectedGames.filter((g) => g !== game));
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Game</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedGames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Game" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleRemoveGame(value)}
                  deleteIcon={<CloseIcon />}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {games.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, selectedGames, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
