/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Markdown from 'src/components/markdown/Markdown';
import TournamentSponsor from '../tournaments/TournamentSponsor';
import { Tournament } from 'src/@types/tournaments';
import { IHomebabaCard } from 'src/@types/user';
import Image from 'src/components/image/Image';
import { ContactForm } from '../contact';
import Iconify from 'src/components/iconify/Iconify';
import Link from 'next/link';
import General from './General';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_PAGE } from 'src/routes/paths';
import Head from 'next/head';
import DemoLightboxPage from 'src/components/lightbox';

type Props = {
  property: IHomebabaCard;
};
function Details({ property }: Props) {
  const [propertyDetails, setPropertyDetails] = useState();
  const [showGeneral, setShowGeneral] = useState(false); // Added state for showing/hiding General component
  return (
    <>
      <Head>
        <title>{property.BuildingName} | Homebaba</title>
      </Head>
      <CustomBreadcrumbs
        heading="Property Details"
        links={[
          { name: 'Home', href: PATH_PAGE.home },

          {
            name: `${property.BuildingName}`,
          },
        ]}
      />{' '}
      <Container>

        <Box>
          <Grid container spacing={5} sx={{ my: 3 }}>
            <Grid item xs={12} md={8}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{property.BuildingName}</Typography>
                <Typography variant="h4">$ {property.ListPrice}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ color: 'text.disabled' }}>
                  {property.City}, {property.StateOrProvince}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.disabled' }}>
                  est.$ {property.ListPrice} /mo
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack flexDirection="row" gap={3}>
                  <Typography variant="body1">{property.BedroomsTotal} bed</Typography>
                  <Typography variant="body1">{property.BathroomsTotalInteger} bath</Typography>
                  <Typography variant="body1">{property.BuildingAreaTotal} sq m</Typography>
                </Stack>
                <Typography variant="body1">For Sale</Typography>
              </Box>

              <Box sx={{ mt: 3, p: 1, backgroundColor: 'whitesmoke' }}>
                <Stack flexDirection="row" alignItems="center">
                  <IconButton aria-label="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path
                        fill="currentColor"
                        d="M6 22q-.825 0-1.413-.588T4 20V10q0-.825.588-1.413T6 8h1V6q0-2.075 1.463-3.538T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.588 1.413T18 22H6Zm0-2h12V10H6v10Zm6-3q.825 0 1.413-.588T14 15q0-.825-.588-1.413T12 13q-.825 0-1.413.588T10 15q0 .825.588 1.413T12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6v2ZM6 20V10v10Z"
                      />
                    </svg>
                  </IconButton>{' '}
                  <Link href="/maintenance">
                    <Typography sx={{ textDecoration: 'underline', pr: 3 }} variant="body1">
                      Join or Sign in
                    </Typography>
                  </Link>
                  <Typography variant="body1">
                    Real estate boards need a verified account to see photos & sold data.
                  </Typography>
                </Stack>
              </Box>
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <Stack flexDirection="row" gap={2} sx={{ pt: 5 }}>
                  <Button variant="outlined">Save</Button>
                  <Button variant="outlined"> Share</Button>
                  <Button variant="outlined">View on Map</Button>
                </Stack>
                <Stack sx={{ pt: 5 }}>
                  <Button variant="outlined">History</Button>
                </Stack>
              </Stack>

              <Stack flexDirection="row" gap={20} sx={{ pt: 3 }}>
                <Stack>
                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Owner:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.OccupantName}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Contact:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.OccupantPhone}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Area:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.BuildingAreaTotal} sq m
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Year Built:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.YearBuilt} AD
                    </Typography>
                  </Stack>

                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Tax Year:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.TaxYear} AD
                    </Typography>
                  </Stack>
                </Stack>

                <Stack>
                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Owner:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.OccupantName}
                    </Typography>
                  </Stack>{' '}
                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Owner:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.OccupantName}
                    </Typography>
                  </Stack>{' '}
                  <Stack flexDirection="row">
                    <Typography variant="body1" fontWeight="bold">
                      Owner:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 1, color: 'text.disabled' }}>
                      {property.OccupantName}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                sx={{ pt: 4 }}
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                gap={3}
              >
                <Link href="/maintenance" style={{ textDecoration: 'none', color: 'white' }}>
                  <Card
                    sx={{
                      p: 2,
                      border: '1px solid transparent',

                      '&:hover': {
                        border: '1px solid black',
                      },
                    }}
                  >
                    <Typography variant="h4">Afford Score</Typography>
                    <Typography variant="h3">Whats my Score?</Typography>
                  </Card>
                </Link>
                <Link href="/maintenance" style={{ textDecoration: 'none', color: 'white' }}>
                  <Card
                    sx={{
                      p: 2,
                      border: '1px solid transparent',

                      '&:hover': {
                        border: '1px solid black',
                      },
                    }}
                  >
                    <Typography variant="h4">Need a Mortgage?</Typography>
                    <Typography variant="h3">Rate as low ass 4.99%</Typography>
                  </Card>
                </Link>
              </Stack>
              {/* <Stack>
                <Box sx={{ mb: 2 }}>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Owner Name: </Typography>
                    <Typography sx={{ ml: 1 }}>{property.OccupantName}</Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Contact Details: </Typography>
                    <Typography sx={{ ml: 1 }}>{property.OccupantPhone}</Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">House Direction: </Typography>
                    <Typography sx={{ ml: 1 }}>{property.DirectionFaces}</Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Year Built: </Typography>
                    <Typography sx={{ ml: 1 }}>{property.YearBuilt}</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Building Features:</Typography>
                    <Typography variant="body2" color="textPrimary" sx={{ ml: 1 }}>
                      {property.BuildingFeatures.length > 0
                        ? property.BuildingFeatures.join(', ')
                        : 'null'}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Laundry Features:</Typography>

                    <Typography variant="body2" color="textPrimary" sx={{ ml: 1 }}>
                      {property.LaundryFeatures.length > 0
                        ? property.LaundryFeatures.join(', ')
                        : 'None'}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Flooring Features:</Typography>
                    <Typography variant="body2" color="textPrimary" sx={{ ml: 1 }}>
                      {property.Flooring.length > 0 ? property.Flooring.join(', ') : 'None'}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Exterior Features:</Typography>

                    <Typography variant="body2" color="textPrimary" sx={{ ml: 1 }}>
                      {property.ExteriorFeatures.length > 0
                        ? property.ExteriorFeatures.join(', ')
                        : 'None'}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Door Features:</Typography>

                    <Typography variant="body2" color="textPrimary" sx={{ ml: 1 }}>
                      {property.DoorFeatures.length > 0 ? property.DoorFeatures.join(', ') : 'None'}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography color="text.secondary">Door Features:</Typography>

                    <Typography variant="body2" color="textPrimary" sx={{ ml: 1 }}>
                      {property.AccessibilityFeatures.length > 0
                        ? property.AccessibilityFeatures.join(', ')
                        : 'None'}
                    </Typography>
                  </Stack>
                </Box>
              </Stack> */}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Ask About this Home
              </Typography>

              <Stack>
                <ContactForm />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Details;
