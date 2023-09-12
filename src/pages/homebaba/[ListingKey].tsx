import { Box, Button, Container, Stack } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from 'src/layouts/main/MainLayout';
import General from 'src/sections/homebaba/General';
import Details from 'src/sections/homebaba/Details';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_PAGE } from 'src/routes/paths';
import { head } from 'lodash';

export default function HomebabaCardPage() {
  const [propertyDetails, setPropertyDetails] = useState();
  const [showGeneral, setShowGeneral] = useState(false); // Added state for showing/hiding General component

  const {
    query: { ListingKey },
  } = useRouter();
  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.bridgedataoutput.com/api/v2/OData/test/Property('${ListingKey}')?access_token=6baca547742c6f96a6ff71b138424f21`
      );

      setPropertyDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [ListingKey]);

  useEffect(() => {
    if (ListingKey) {
      getPost();
    }
  }, [getPost, ListingKey]);

  const [currentTab, setCurrentTab] = useState('general');

  // const TABS = [
  //   {
  //     value: 'general',
  //     label: 'General',
  //     icon: <Iconify icon="mdi:information" />,
  //     component: propertyDetails && <General property={propertyDetails}/>,
  //   },
  //   {
  //     value: 'details',
  //     label: 'Details',
  //     icon: <Iconify icon="solar:home-bold" />,
  //     component: propertyDetails && <Details property={propertyDetails} />,
  //   },
  //   {
  //     value: 'gallery',
  //     label: 'Gallery',
  //     icon: <Iconify icon="grommet-icons:gallery" />,
  //     component: <Gallery />,
  //   },
  // ];
  return (
    <MainLayout>
      <Container maxWidth={false} sx={{ pt: 1, pb: 10 }}>
        <Stack flexDirection="column">
          <Box>{propertyDetails && <Details property={propertyDetails} />}</Box>
          <Box sx={{pt:4}}>{propertyDetails && <General property={propertyDetails} />}</Box>
          {/* <Box sx={{ pt: 3 }}>
            <Button variant="outlined" sx={{ ml: 18 }} onClick={() => setShowGeneral(!showGeneral)}>
              {showGeneral ? 'See Less Facts and Features' : 'See More Facts and Features'}
            </Button>{' '}
            <Box sx={{ pt: 4 }}>
              {propertyDetails && <>{showGeneral && <General property={propertyDetails} />}</>}
            </Box>
          </Box> */}
        </Stack>
      </Container>
    </MainLayout>
  );
}
