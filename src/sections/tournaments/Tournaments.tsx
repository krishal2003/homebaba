import { Container } from '@mui/system';
import React from 'react';
import { TournamentCard } from '../@dashboard/user/cards';
import TournamentsGames from './TournamentsGames';
import TournamentsStreaming from './TournamentsStreaming';
import TournamentsSubmit from './TournamentsSubmit';
import {  Box } from '@mui/material';

function TournamentBelowHero() {
  return (
    <Container sx={{ pt: 1, pb: 10, position: 'relative' }}>
        <Box
          gap={3}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          sx={{ pt: 2 }}
        >
          <TournamentsGames />
          {/* <TournamentsGameType /> */}
          <TournamentsStreaming />
          <TournamentsSubmit />
        </Box>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          sx={{ pt: 5, pb: 2 }}
        >
            <TournamentCard />
        </Box>
      </Container>
  );
}

export default TournamentBelowHero ;
