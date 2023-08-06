import { useEffect, useState, useCallback } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { SkeletonPostDetails } from '../../../../components/skeleton';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { EventData } from 'src/@types/events';
import EventNewPostForm from 'src/sections/@dashboard/events/EventNewPostForm';

// ----------------------------------------------------------------------

export default function NewEditEventPage() {
  const {
    query: { slug },
  } = useRouter();

  const [event, setEvent] = useState<EventData['event'] | undefined>(undefined);

  const [loadingEvent, setLoadingEvent] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getEvent = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/event-detail/', {
        params: { slug },
      });

      setEvent(response.data.event);
      setLoadingEvent(false);
    } catch (error) {
      console.error(error);
      setLoadingEvent(false);
      setErrorMsg(error.message);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      getEvent();
    }
  }, [getEvent, slug]);

  return (
    <Container maxWidth={false}>
      {errorMsg && !loadingEvent && <Typography variant="h6">404 {errorMsg}</Typography>}

      {loadingEvent && <SkeletonPostDetails />}

      <EventNewPostForm isEdit currentEvent={event} />
    </Container>
  );
}
