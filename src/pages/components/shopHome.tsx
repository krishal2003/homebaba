import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { _featuredCards } from 'src/_mock/arrays';
import ShopCard from 'src/sections/@dashboard/user/cards/ShopCard';

function ShopHome() {
  return (
    <Container>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 5, pb: 5 }}
      >
        <Typography variant="h2">Featured Items</Typography>
        <Link href="/shop" style={{ textDecoration: 'none', color: 'white' }}>
          <Button variant="outlined"> View All</Button>
        </Link>
      </Stack>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {_featuredCards.map((user) => (
          <ShopCard key={user.id} user={user} />
        ))}
      </Box>
    </Container>
  );
}

export default ShopHome;
