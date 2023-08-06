// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Avatar,
  Typography,
  CardContent,
  Link,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
// components
import Image from '../../../components/image';
import TextMaxLine from '../../../components/text-max-line';
import SvgColor from '../../../components/svg-color';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { useSnackbar } from 'notistack';
import ConfirmDialog from 'src/components/confirm-dialog/ConfirmDialog';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import { EventData } from 'src/@types/events';
// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type Props = {
  event: EventData['event'];
  index?: number;
  isDashboard?: boolean;
};

export default function EventsPostCard({ event, index, isDashboard }: Props) {
  const isDesktop = useResponsive('up', 'md');

  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    event_thumbnail,
    event_thumbnail_alt_description,
    event_end_date,
    event_name,
    event_start_date,
    slug,
    organizer,
  } = event;

  const latestEvent = index === 0 || index === 1 || index === 2;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = async () => {
    axiosInstance2
      .delete('/delete-event/', {
        params: {
          slug,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data.success);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  if (isDesktop && latestEvent) {
    return (
      <>
        <Card>
          <Avatar
            alt={organizer.organizer_name}
            src={BASE_IMAGE_PATH + organizer.user.avatar}
            sx={{
              top: 24,
              left: 24,
              zIndex: 9,
              position: 'absolute',
            }}
          />
          <EventContent
            title={event_name}
            start_date={event_start_date}
            end_date={event_end_date}
            index={index}
            handleOpenConfirm={handleOpenConfirm}
            isDashboard={isDashboard}
            slug={`${slug}`}
          />

          <StyledOverlay />

          <Image
            alt={event_thumbnail_alt_description}
            src={BASE_IMAGE_PATH + event_thumbnail}
            sx={{ height: 360 }}
          />
        </Card>
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Delete"
          content={<>Are you sure want to delete items?</>}
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onDelete();
                handleCloseConfirm();
              }}
            >
              Delete
            </Button>
          }
        />
      </>
    );
  }

  return (
    <>
      <Card>
        <Box sx={{ position: 'relative' }}>
          <SvgColor
            src="/assets/shape_avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />

          <Avatar
            alt={organizer.organizer_name}
            src={BASE_IMAGE_PATH + organizer.user.avatar}
            sx={{
              left: 24,
              zIndex: 9,
              width: 32,
              height: 32,
              bottom: -16,
              position: 'absolute',
            }}
          />

          <Image
            alt={event_thumbnail_alt_description}
            src={BASE_IMAGE_PATH + event_thumbnail}
            ratio="4/3"
          />
        </Box>

        <EventContent
          title={event_name}
          start_date={event_start_date}
          end_date={event_end_date}
          isDashboard={isDashboard}
          handleOpenConfirm={handleOpenConfirm}
          slug={`${slug}`}
        />
      </Card>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={<>Are you sure want to delete event?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

type EventContentProps = {
  title: string;
  isDashboard?: boolean;
  start_date: Date | string | number;
  end_date: Date | string | number;
  index?: number;
  slug: string;
  handleOpenConfirm: () => void;
};

export function EventContent({
  title,
  start_date,
  end_date,
  index,
  isDashboard,
  handleOpenConfirm,
  slug,
}: EventContentProps) {
  const isDesktop = useResponsive('up', 'md');

  const linkTo = !isDashboard
    ? PATH_PAGE.event.view(slug)
    : PATH_DASHBOARD.event.event_dashboard(slug);

  const latestEventLarge = index === 0;

  const latestEventSmall = index === 1 || index === 2;

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestEventLarge || latestEventSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack>
        <Typography
          gutterBottom
          variant="caption"
          component="div"
          sx={{
            color: 'text.disabled',
            ...((latestEventLarge || latestEventSmall) && {
              opacity: 0.64,
              color: 'common.white',
            }),
          }}
        >
          {fDate(start_date)} - {fDate(end_date)}
        </Typography>

        <Link component={NextLink} href={linkTo} color="inherit">
          <TextMaxLine
            variant={isDesktop && latestEventLarge ? 'h5' : 'subtitle2'}
            line={2}
            persistent
          >
            {title}
          </TextMaxLine>
        </Link>
      </Stack>

      <Stack>
        {isDashboard && (
          <Stack spacing={2} direction="row">
            <IconButton size="small" href={PATH_DASHBOARD.event.event_dashboard(slug)} color="info">
              <Iconify icon="material-symbols:edit" width={24} />
            </IconButton>
            <IconButton size="small" onClick={handleOpenConfirm} color="error">
              <Iconify icon="material-symbols:delete" width={24} />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </CardContent>
  );
}
