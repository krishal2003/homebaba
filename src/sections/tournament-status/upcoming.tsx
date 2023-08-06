import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Avatar,
  Stack,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { Block } from '../_examples/Block';
import { _tournament_landing } from 'src/_mock/arrays/_tournement_landing';

function Upcoming() {
  return (
    <Box sx={{ pt: 5 }}>
      <Block title="">
        {_tournament_landing.map((accordion, index) => (
          <Box sx={{ pb: 1 }}>
            <Accordion>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt="game" src={accordion.image} />

                  <Typography variant="subtitle2" noWrap>
                    {accordion.heading}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <Box>
                <AccordionDetails>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack alignItems="center" spacing={2}>
                      <Avatar alt="game" src={accordion.image} />
                      <Typography variant="body2">{accordion.team1}</Typography>
                    </Stack>
                    <Stack justifyContent="center" gap={2} alignItems="center">
                      <Typography variant="h3">VS</Typography>
                      <Typography sx={{ fontSize: 12 }}>{accordion.date}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={2}>
                      <Avatar alt="game" src={accordion.image} />
                      <Typography variant="body2">{accordion.team2}</Typography>
                    </Stack>
                  </Stack>
                </AccordionDetails>
              </Box>
            </Accordion>
          </Box>
        ))}
      </Block>
    </Box>
  );
}

export default Upcoming;
