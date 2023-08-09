import { Box, Card, CardContent, CardHeader, Container, Typography } from '@mui/material';
import { ITournamentCard } from 'src/@types/user';
import axiosInstance2 from 'src/utils/axios2';
import Markdown from 'src/components/markdown/Markdown';
import TournamentSponsor from '../tournaments/TournamentSponsor';
import { CarouselAnimation } from '../_examples/extra/carousel';
import _mock from 'src/_mock/_mock';

const _carouselsExample = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  image: _mock.image.cover(index),
  description: _mock.text.description(index),
}));

function Gallery() {
  return (
    <>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography variant="h3">Outer View</Typography>
      </Box>

      <CardContent>
        <CarouselAnimation data={_carouselsExample} />
      </CardContent>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography variant="h3">Inner View</Typography>
      </Box>

      <CardContent>
        <CarouselAnimation data={_carouselsExample} />
      </CardContent>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography variant="h3">Others</Typography>
      </Box>

      <CardContent>
        <CarouselAnimation data={_carouselsExample} />
      </CardContent>
    </>
  );
}

export default Gallery;
