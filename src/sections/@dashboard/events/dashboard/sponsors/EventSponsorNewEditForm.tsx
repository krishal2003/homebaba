import * as Yup from 'yup';
import { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography } from '@mui/material';
// routes
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
// components
import { useSnackbar } from '../../../../../components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from '../../../../../components/hook-form';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { ISponsors } from 'src/@types/event-sponsors';
import { useRouter } from 'next/router';
import { CustomFile } from 'src/components/upload';

// ----------------------------------------------------------------------

export interface SponsorFormValues {
  sponsor_name: string;
  sponsorship_category: string;
  sponsor_banner: CustomFile | string | null;
  order: number;
}

type Props = {
  isEdit?: boolean;
  currentSponsor?: ISponsors;
  refetch: boolean;
  handleClose: () => void;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

export default function SponsorForm({
  isEdit,
  currentSponsor,
  setRefetch,
  refetch,
  handleClose,
}: Props) {
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const {
    query: { slug },
  } = useRouter();

  const getSponsors = useCallback(async () => {
    try {
      // Fetch sponsor categories here if needed
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSponsors();
  }, [getSponsors]);

  const SponsorSchema = Yup.object().shape({
    sponsor_name: Yup.string().required('Sponsor Name is required'),
    sponsorship_category: Yup.string().required('Sponsorship Category is required'),
    sponsor_banner: Yup.mixed().required('Sponsor Banner is required'),
    order: Yup.string().required('Order is required'),
  });

  const defaultValues = {
    sponsor_name: currentSponsor?.sponsor_name || '',
    sponsorship_category: currentSponsor?.sponsorship_category || '',
    sponsor_banner: currentSponsor?.sponsor_banner
      ? `${BASE_IMAGE_PATH + currentSponsor.sponsor_banner}`
      : null,
    order: currentSponsor?.order || 0,
  };

  const methods = useForm<SponsorFormValues>({
    resolver: yupResolver(SponsorSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentSponsor) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSponsor]);

  const values = watch();

  const onSubmit = async (data: SponsorFormValues) => {
    const formData = new FormData();
    formData.append('sponsor_name', data.sponsor_name);
    formData.append('sponsorship_category', data.sponsorship_category);
    formData.append('sponsor_banner', data.sponsor_banner as Blob);
    formData.append('order', `${data.order}`);

    if (isEdit && currentSponsor) {
      formData.append('id', `${currentSponsor.id}`);
      axiosInstance2
        .post('/update-event-sponsor/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          setRefetch(!refetch);
          handleClose();
          enqueueSnackbar(res.data.success);
        })
        .catch((error) => console.error(error));
    } else {
      formData.append('slug', slug as string);
      axiosInstance2
        .post('/create-event-sponsor/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          setRefetch(!refetch);
          handleClose();
          enqueueSnackbar(res.data.success);
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
        reset({
          ...values,
          sponsor_banner: newFile,
        });
      }
    },
    [reset, values]
  );

  const handleRemoveFile = () => {
    reset({
      ...values,
      sponsor_banner: null,
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="sponsor_name" label="Sponsor Name" />

              <RHFTextField name="sponsorship_category" label="Sponsorship Category" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Sponsor Banner
                </Typography>

                <RHFUpload
                  name="sponsor_banner"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>

              <RHFTextField name="order" label="Order" type="number" defaultValue={0} />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1.5}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {isEdit ? 'Update Sponsor' : 'Create Sponsor'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
