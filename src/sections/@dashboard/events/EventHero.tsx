import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';
// hooks
// import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
// components
import Image from '../../../components/image';
// import Iconify from '../../../components/iconify';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { EventData } from 'src/@types/events';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h3,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    ...theme.typography.h2,
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const StyledFooter = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  event: EventData['event'];
};

export default function EventHero({ event }: Props) {
  const {
    event_thumbnail,
    event_thumbnail_alt_description,
    event_name,
    organizer,
    event_start_date,
  } = event;

  // const isDesktop = useResponsive('up', 'sm');

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        borderRadius: {
          xs: `16px 16px 16px 16px`,
          md: `16px 16px 0 0`,
        },
      }}
    >
      <StyledTitle>{event_name}</StyledTitle>

      <StyledFooter>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={organizer.organizer_name}
            src={BASE_IMAGE_PATH + organizer.user.avatar}
            sx={{ width: 48, height: 48 }}
          />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {organizer.organizer_name}
            </Typography>

            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDate(event_start_date)}
            </Typography>
          </Box>
        </Box>
      </StyledFooter>

      <StyledOverlay />

      <Image
        alt={event_thumbnail_alt_description}
        src={BASE_IMAGE_PATH + event_thumbnail}
        ratio="16/9"
      />
    </Box>
  );
}
