import { Box, CardMedia, Container, List, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from 'src/layouts/main/MainLayout';
import { IHomebabaCard } from 'src/@types/user';
import Iconify from 'src/components/iconify';
import LiveStreaming from 'src/sections/touraments-tab/LiveStreaming';
import Overview from 'src/sections/touraments-tab/Overview';
import Participants from 'src/sections/touraments-tab/Participants';
import TournamentFAQ from 'src/sections/tournaments/TournamentFAQ';
import TournamentSponsor from 'src/sections/tournaments/TournamentSponsor';
import ComingSoonPage from '../coming-soon';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATH_PAGE } from 'src/routes/paths';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import General from 'src/sections/homebaba/General';
import Details from 'src/sections/homebaba/Details';
import Gallery from 'src/sections/homebaba/Gallery';
import { useParams } from 'react-router-dom';

export default function HomebabaCardPage() {
  const [propertyDetails, setPropertyDetails] = useState(null);

  // const {
  //   query: { ListingKey },
  // } = useRouter();

  // console.log('ListingKey:', ListingKey);

  // useEffect(() => {
  //   async function fetchPropertyDetails() {
  //     try {
  //       const response = await axios.get(
  //         `https://api.bridgedataoutput.com/api/v2/OData/test/Property('${ListingKey}')?access_token=6baca547742c6f96a6ff71b138424f21`
  //       );
  //       setPropertyDetails(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchPropertyDetails();
  // }, [ListingKey]);
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

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="mdi:information" />,
      component: propertyDetails && <General property={propertyDetails}/>,
    },
    {
      value: 'details',
      label: 'Details',
      icon: <Iconify icon="solar:home-bold" />,
      component: propertyDetails && <Details property={propertyDetails} />,
    },
    {
      value: 'gallery',
      label: 'Gallery',
      icon: <Iconify icon="grommet-icons:gallery" />,
      component: <Gallery />,
    },
  ];
  return (
    <MainLayout>
      <Container sx={{ pt: 1, pb: 10 }}>
        

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>
        {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}

      
      </Container>
    </MainLayout>
  );
}
