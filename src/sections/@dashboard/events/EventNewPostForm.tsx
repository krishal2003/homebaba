import * as Yup from 'yup';
import { useCallback, useMemo, useEffect } from 'react';

// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography, TextField } from '@mui/material';
// routes
import { paramCase } from 'change-case';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
// @types

import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFEditor, RHFUpload, RHFTextField } from '../../../components/hook-form';
//
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { addDays, isBefore } from 'date-fns';
import { EventData } from 'src/@types/events';
import { fDateTime } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type FormValuesProps = EventData['event'];

type Props = {
  isEdit?: boolean;
  currentEvent?: EventData['event'];
};

export default function EventNewPostForm({ isEdit, currentEvent }: Props) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const EventSchema = Yup.object().shape({
    event_name: Yup.string().required('Event name is required'),
    event_description: Yup.string().required('Event description is required'),
    event_thumbnail: Yup.mixed().required('Event thumbnail is required'),
  });

  const defaultValues = useMemo(
    () => ({
      event_name: currentEvent?.event_name || '',
      event_description: currentEvent?.event_description || '',
      event_start_date: currentEvent?.event_start_date || addDays(new Date(), 1),
      event_end_date: currentEvent?.event_end_date || addDays(new Date(), 3),
      event_thumbnail: currentEvent?.event_thumbnail
        ? `${BASE_IMAGE_PATH + currentEvent.event_thumbnail}`
        : null,
    }),
    [currentEvent]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const isDateError =
    values.event_start_date && values.event_end_date
      ? isBefore(new Date(values.event_end_date), new Date(values.event_start_date))
      : false;

  useEffect(() => {
    if (isEdit && currentEvent) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentEvent]);

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('slug', paramCase(data.event_name));
    formData.append('event_name', data.event_name);
    formData.append('event_description', data.event_description);
    formData.append('event_start_date', new Date(fDateTime(data.event_start_date)).toISOString());
    formData.append('event_end_date', new Date(fDateTime(data.event_end_date)).toISOString());
    formData.append('event_thumbnail_alt_description', paramCase(data.event_name));
    formData.append('event_thumbnail', data.event_thumbnail as Blob);

    if (isEdit) {
      formData.append('id', `${currentEvent!.id}`);
      axiosInstance2
        .post('/update-event/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.event.events);
        })
        .catch((error) => console.error(error));
    } else {
      axiosInstance2
        .post('/create-event/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.event.events);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('event_thumbnail', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('event_thumbnail', null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="event_name" label="Event Name" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Event Description
                </Typography>

                <RHFEditor simple name="event_description" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Thumbnail Image
                </Typography>

                <RHFUpload
                  name="event_thumbnail"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1.5} sx={{ mt: 3 }}>
            <Controller
              name="event_start_date"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  onChange={(newValue: Date | null) => field.onChange(newValue)}
                  label="Start date"
                  inputFormat="dd/MM/yyyy hh:mm a"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )}
            />

            <Controller
              name="event_end_date"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  onChange={(newValue: Date | null) => field.onChange(newValue)}
                  label="End date"
                  inputFormat="dd/MM/yyyy hh:mm a"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!isDateError}
                      helperText={isDateError && 'End date must be later than start date'}
                    />
                  )}
                />
              )}
            />
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Post
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
