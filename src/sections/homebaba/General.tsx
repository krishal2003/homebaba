/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import Markdown from 'src/components/markdown/Markdown';
import TournamentSponsor from '../tournaments/TournamentSponsor';
import { Tournament } from 'src/@types/tournaments';
import { IHomebabaCard } from 'src/@types/user';
import { ContactForm } from '../contact';
import Image from '../../components/image';

type Props = {
  property: IHomebabaCard;
};
function General({ property }: Props) {
  return (
    <Box>
      <Typography variant="h2" sx={{ mt: 3, mb: 2 }}>
        {property.BuildingName}
      </Typography>
      <Grid container spacing={5} sx={{ my: 3 }}>
        <Grid item xs={12} md={6}>
          <Stack>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4">Personal Details</Typography>
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
              <Typography variant="h4">Features</Typography>
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
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            <Paper sx={{ position: 'relative' }}>
              <Image alt='asas' src={property.Media.MediaUrl} ratio="16/9" />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      <Typography variant="h2" color="text.secondary" sx={{ pt: 3 }}>
        Public Remarks
      </Typography>
      <Typography variant="body2" color="textPrimary">
        {property.PublicRemarks}
      </Typography>

      <Typography variant="h2" sx={{ textAlign: 'center', pt: 3 }}>
        Reach out. We&rsquo;re here for you.{' '}
      </Typography>

      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </Box>
  );
}

export default General;
