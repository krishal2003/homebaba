import {
  Card,
  Avatar,
  Typography,
  Divider,
  alpha,
  styled,
  Box,
  Button,
  CardActions,
} from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { ITournamentCard } from 'src/@types/user';
import SvgColor from 'src/components/svg-color';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import Image from '../../../../components/image';
import Markdown from 'src/components/markdown/Markdown';
import Link from 'next/link';

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

export default function TournamentCard() {
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
          <Card sx={{ textAlign: 'center', mb: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <SvgColor
                src="/assets/shape_avatar.svg"
                sx={{
                  width: 144,
                  height: 62,
                  zIndex: 10,
                  left: 0,
                  right: 0,
                  bottom: -26,
                  mx: 'auto',
                  position: 'absolute',
                  color: 'background.paper',
                }}
              />

              <Avatar
                alt={tournaments.tournament_name}
                src={BASE_IMAGE_PATH + tournaments.tournament_logo}
                sx={{
                  width: 64,
                  height: 64,
                  zIndex: 11,
                  left: 0,
                  right: 0,
                  bottom: -32,
                  mx: 'auto',
                  position: 'absolute',
                }}
              />

              <StyledOverlay />

              <Image
                src={BASE_IMAGE_PATH + tournaments.tournament_banner}
                alt={tournaments.tournament_name}
                ratio="16/9"
              />
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
              {tournaments.tournament_name}
            </Typography>

            <Markdown
              children={tournaments.tournament_description}
              sx={{
                color: 'text.secondary',
                mb: 0,
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardActions sx={{ display: 'flex', gap: 2 }}>
                <Link href='coming-soon'>
                <Button variant="contained" >Join</Button>
                </Link>

                <Button href={`/tournaments/${tournaments.id}`} variant="contained">
                  View More
                </Button>
              </CardActions>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
              <div>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ mb: 0.75, color: 'text.disabled' }}
                >
                  Tournament Mode
                </Typography>
                <Typography variant="subtitle1">{tournaments.tournament_mode}</Typography>
              </div>

              <div>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ mb: 0.75, color: 'text.disabled' }}
                >
                  Participants
                </Typography>

                <Typography variant="subtitle1">{tournaments.tournament_participants}</Typography>
              </div>

              <div>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ mb: 0.75, color: 'text.disabled' }}
                >
                  Tournament Fee
                </Typography>
                <Typography variant="subtitle1">{tournaments.tournament_fee}</Typography>
              </div>
            </Box>
          </Card>
        ))}
    </div>
  );
}
