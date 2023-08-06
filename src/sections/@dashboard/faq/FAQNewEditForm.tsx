import * as Yup from 'yup';
import { useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// routes
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import axiosInstance2 from 'src/utils/axios2';
import { IFaqs } from 'src/@types/faq';
import uuidv4 from '../../../utils/uuidv4';

// ----------------------------------------------------------------------

type FormValuesProps = {
  heading: string;
  detail: string;
};

type Props = {
  isEdit?: boolean;
  eventKoLagi?: boolean;
  eventSlug?: string;
  currentFAQ?: IFaqs;
};

export default function FAQNewEditForm({
  isEdit = false,
  currentFAQ,
  eventKoLagi,
  eventSlug,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    heading: Yup.string().required('Heading is required'),
    detail: Yup.string().required('Detail is required'),
  });

  const defaultValues = useMemo(
    () => ({
      heading: currentFAQ?.heading || '',
      detail: currentFAQ?.detail || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFAQ]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('heading', data.heading);
    formData.append('detail', data.detail);

    if (eventKoLagi && eventSlug) {
      if (!isEdit && !currentFAQ) {
        formData.append('value', uuidv4());
        formData.append('slug', eventSlug);
        axiosInstance2
          .post('/create-event-faq/', formData)
          .then((res) => {
            reset();
            enqueueSnackbar(res.data.success);
            window.location.reload();
          })
          .catch((error) => enqueueSnackbar(error.value, { variant: 'error' }));
      } else {
        formData.append('id', `${currentFAQ?.id}`);
        axiosInstance2
          .post('/update-event-faq/', formData)
          .then((res) => {
            reset();
            enqueueSnackbar(res.data.success);
            window.location.reload();
          })
          .catch((error) => enqueueSnackbar(error.value, { variant: 'error' }));
      }
    } else {
      axiosInstance2
        .post('/create-faq/', formData)
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          window.location.reload();
        })
        .catch((error) => enqueueSnackbar(error.value, { variant: 'error' }));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <RHFTextField name="heading" label="Heading" />
        <RHFTextField name="detail" label="Detail" multiline rows={4} />
      </Stack>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Create Faq' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
