/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ITournamentCard } from 'src/@types/user';
import axiosInstance2 from 'src/utils/axios2';
import Markdown from 'src/components/markdown/Markdown';
import TournamentSponsor from '../tournaments/TournamentSponsor';

function Overview() {
  const [tournamentList, setTournamentList] = useState<ITournamentCard[]>([]);

  const getTournamentList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/tournaments/');
      setTournamentList(response.data.tournaments);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getTournamentList();
  }, [getTournamentList]);

  return (
    <div>
      {tournamentList &&
        tournamentList.map((tournaments) => (
          <>
            <Box
              gap={5}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
              sx={{ my: 3, p: 3 }}
            >
              <Typography variant="h6" color="text.secondary">
                ENTRY FEE <br />{' '}
                <Typography color="textPrimary">Rs. {tournaments.tournament_fee}</Typography>
              </Typography>{' '}
              <Typography variant="h6" color="text.secondary">
                LOCATION <br />{' '}
                <Typography color="textPrimary">{tournaments.tournament_fee}</Typography>
              </Typography>{' '}
              <Typography variant="h6" color="text.secondary">
                MODE <br />{' '}
                <Typography color="textPrimary">{tournaments.tournament_mode}</Typography>
              </Typography>{' '}
              <Typography variant="h6" color="text.secondary">
                ENTRY DEADLINE <br />
                <Typography color="textPrimary">{tournaments.registration_closing_date}</Typography>
              </Typography>{' '}
              <Typography variant="h6" color="text.secondary">
                GAME DATE <br />{' '}
                <Typography color="textPrimary">{tournaments.tournament_start_date}</Typography>
              </Typography>{' '}
              <Typography variant="h6" color="text.secondary">
                PLATFORM <br />{' '}
                <Typography color="textPrimary">{tournaments.game.game_type}</Typography>
              </Typography>{' '}
            </Box>
            <Box>
              <Typography variant="h4">{tournaments.tournament_name}</Typography>
              <Markdown
                children={tournaments.tournament_description}
                sx={{
                  color: 'text.secondary',
                  mb: 0,
                }}
              />
            </Box>
            <Box sx={{ pt: 5 }}>
              <TournamentSponsor />
            </Box>
          </>
        ))}
    </div>
  );
}

export default Overview;
