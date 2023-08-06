import { Box, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { _shopCards } from 'src/_mock/arrays';
import ShopCard from 'src/sections/@dashboard/user/cards/ShopCard';
import { CustomTextField } from './custom-input';
import Iconify from './iconify';

export default function Shop() {
  const [query, setQuery] = useState('');
  const filterCards = (card: { productName: string }) =>
    card.productName.toLowerCase().includes(query.toLowerCase());
  return (
    <div className="app">
      <Box sx={{ pb:4}}>
        <CustomTextField
          width={250}
          placeholder="Search products..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {_shopCards.filter(filterCards).map((user) => (
          <ShopCard key={user.id} user={user} />
        ))}
      </Box>
    </div>
  );
}

