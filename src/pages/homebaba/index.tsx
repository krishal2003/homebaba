import { Box, Container } from '@mui/material';
import axios from 'axios';
import { m } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import MainLayout from 'src/layouts/main/MainLayout';
import HomebabaCard from 'src/sections/@dashboard/user/cards/HomebabaCards';

Homebaba.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

function Homebaba() {
  const [propertyList, setPropertyList] = useState<[]>([]);

  const getPropertyList = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21'
      );
      setPropertyList(response.data.value);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getPropertyList();
  }, [getPropertyList]);

  return (
    <Container sx={{ pt: 1, pb: 10, position: 'relative' }}>
      <Box
        component={m.div}
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ pt: 5, pb: 2 }}
      >
        {propertyList.map((property) => (
          <HomebabaCard property={property} />
        ))}
      </Box>
    </Container>
  );
}

export default Homebaba;
