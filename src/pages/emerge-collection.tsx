// next
import Head from 'next/head';
// layouts
import MainLayout from '../layouts/main';
import { Box, Container, Typography } from '@mui/material';
import { _emergeCards } from 'src/_mock/arrays';
import ShopCard from 'src/sections/@dashboard/user/cards/ShopCard';
// _mock

// ----------------------------------------------------------------------

EmergeCollection.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function EmergeCollection() {
  return (
    <>
      <Head>
        <title> Emerge: The Triad of Harmony | Dmerce</title>
      </Head>

      <Container>
        <Box>
          <Typography variant="h2" color="text.disabled">
            Emerge: The Triad of Harmony Collection
          </Typography>
        </Box>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          sx={{ pb: 4, pt: 3 }}
        >
          {_emergeCards.map((user) => (
            <ShopCard key={user.id} user={user} />
          ))}
        </Box>
        <Box sx={{ pb: 4 }}>
          <Typography variant="h5" >The first DMERCE drop is a reflection to the human history. As the name suggestes, Emerge reflects the journey of overcoming domination and destruction, moving towards
            unity and diversity, and ultimately achieving balance and harmony. The phrase &ldquo;The Triad of Harmony&rdquo; emphasizes the three distinct phases represented by the
            individual tees.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
