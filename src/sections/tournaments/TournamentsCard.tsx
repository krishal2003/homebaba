import React from 'react';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import Label from 'src/components/label';

interface TournamentsCardProps {
  image: string;
  title: string;
  status: string;
  description: string;
  slug: string;
}

const TournamentsCard: React.FC<TournamentsCardProps> = ({
  image,
  title,
  description,
  status,
  slug,
}) => (
  <Card sx={{ maxWidth: 345, mt: 5, pb: 2, borderRadius: 1 }}>
    <CardMedia component="img" alt="loading" height="140" image={image} />
    <CardContent>
      <Label color={status === 'Live' ? 'error' : 'info'} variant="filled">
        {status}
      </Label>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions sx={{ display: 'flex', gap: 2, px: 3 }}>
      <Button href={`/tournaments/${slug}`} variant="contained">
        Join
      </Button>
      <Button variant="contained">View More</Button>
    </CardActions>
  </Card>
);

export default TournamentsCard;
