import React from 'react';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import Label from 'src/components/label';
import { Tournament } from 'src/@types/tournaments';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { fDate } from 'src/utils/formatTime';
import Image from 'src/components/image/Image';

interface TournamentsCardProps {
  tournament: Tournament;
}

const EventTournamentsCard = ({ tournament }: TournamentsCardProps) => {
  const { tournament_banner, tournament_name, tournament_start_date, tournament_end_date, id } =
    tournament;
  return (
    <Card>
      <Image ratio="16/9" src={BASE_IMAGE_PATH + tournament_banner} />
      <CardContent>
        <Label color="error" variant="filled">
          Live
        </Label>
        <Typography gutterBottom variant="h5" component="div">
          {tournament_name}
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          component="div"
          sx={{
            color: 'text.disabled',
          }}
        >
          {fDate(tournament_start_date)} - {fDate(tournament_end_date)}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button href={`/tournaments/${id}`} variant="contained">
            Join
          </Button>
          <Button variant="contained">View More</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventTournamentsCard;
