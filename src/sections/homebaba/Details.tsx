/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Box, Typography } from '@mui/material';
import Markdown from 'src/components/markdown/Markdown';
import TournamentSponsor from '../tournaments/TournamentSponsor';
import { Tournament } from 'src/@types/tournaments';
import { IHomebabaCard } from 'src/@types/user';

type Props = {
  property: IHomebabaCard;
};
function Details({ property }: Props) {
  return (
    <Box
      gap={5}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      sx={{ pt: 1 }}
    >
      <Typography variant="h6" color="text.secondary">
        STATE <br /> <Typography color="textPrimary">{property.StateOrProvince}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        CITY <br /> <Typography color="textPrimary">{property.City}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        UNPARSED ADDRESS <br />{' '}
        <Typography color="textPrimary">{property.UnparsedAddress}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        ASSOCIATION NAME <br />{' '}
        <Typography color="textPrimary"> {property.AssociationName2}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        PRICE <br />
        <Typography color="textPrimary">$. {property.ListPrice}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        AREA (square metre) <br />
        <Typography color="textPrimary"> {property.BuildingAreaTotal}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        TOTAL NUMBER OF ROOMS <br />
        <Typography color="textPrimary"> {property.RoomsTotal}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        TOTAL NUMBER OF BEDROOM <br />
        <Typography color="textPrimary"> {property.BedroomsTotal}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        TOTAL NUMBER OF BATHROOM <br />
        <Typography color="textPrimary"> {property.BathroomsTotalInteger}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        TOTAL STOREY <br />
        <Typography color="textPrimary"> {property.Stories}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        TAX YEAR <br />
        <Typography color="textPrimary"> {property.TaxYear}</Typography>
      </Typography>{' '}
      <Typography variant="h6" color="text.secondary">
        CARPORT SPACES <br />
        <Typography color="textPrimary"> {property.CarportSpaces}</Typography>
      </Typography>{' '}
    </Box>
  );
}

export default Details;
