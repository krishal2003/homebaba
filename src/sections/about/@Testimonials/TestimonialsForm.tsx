import { m } from 'framer-motion';
// form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Stack, Rating, Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import axiosInstance2 from 'src/utils/axios2';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------
type FormValuesProps = {
  description: string;
  rating: number;
};

export const FormSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description is required')
    .min(6, 'Mininum 6 characters')
    .max(120, 'Maximum 120 characters'),
  rating: Yup.number().required('Rating is required'),
});

export default function TestimonialsForm() {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const testimonial = new FormData();

    testimonial.append('description', data.description);
    testimonial.append('rating', `${data.rating}`);
    axiosInstance2
      .post('/submit-testimonial/', testimonial)
      .then((res) => {
        console.log(res);
        enqueueSnackbar(res.data.success);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Sharing', { variant: 'error' });
      });
    reset();
  };

  const defaultValues = {
    description: '',
    rating: 3,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={5}>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <m.div variants={varFade().inUp}>
            <RHFTextField name="description" label="Description" multiline rows={4} />
          </m.div>

          <m.div variants={varFade().inUp}>
            <Controller
              name="rating"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Stack spacing={1}>
                  <Typography variant="button">Rating</Typography>
                  <Rating {...field} />
                </Stack>
              )}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <LoadingButton
            fullWidth
            color="info"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Submit Views
          </LoadingButton>
        </m.div>
      </Stack>
    </FormProvider>
  );
}
