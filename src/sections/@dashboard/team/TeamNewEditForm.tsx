import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import axiosInstance2 from 'src/utils/axios2';
import uuidv4 from '../../../utils/uuidv4';
import { ITeam } from 'src/@types/team';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  post: string;
  image: string;
  facebook_link: string;
  twitter_link: string;
  discord_link: string;
  instagram_link: string;
  linkedin_link: string;
  twitch_link: string;
};

type Props = {
  isEdit?: boolean;
  currentTeam?: Partial<ITeam>;
};

export default function TeamNewEditForm({ isEdit = false, currentTeam }: Props) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    post: Yup.string().required('Post is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentTeam?.name || '',
      post: currentTeam?.post || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTeam]
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

  useEffect(() => {
    if (isEdit && currentTeam) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTeam]);

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('value', uuidv4());
    formData.append('name', data.name);
    formData.append('post', data.post);
    formData.append('image', data.image);
    formData.append('facebook_link', data.facebook_link);
    formData.append('instagram_link', data.instagram_link);
    formData.append('discord_link', data.discord_link);
    formData.append('twitch_link', data.twitch_link);
    formData.append('twitter_link', data.twitter_link);
    formData.append('linkedin_link', data.linkedin_link);

    if (isEdit) {
      axiosInstance2
        .post('/update-user-detail/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.user.list);
        })
        .catch((error) => console.error(error));
    } else {
      axiosInstance2
        .post('/create-ourteam/ ', formData)
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

        <RHFTextField name="name" label="Full Name" />
        <RHFTextField name="post" label="Post" />
        <RHFTextField name="image" label="Image" />
        <RHFTextField name="facebook_link" label="Facebook" />
        <RHFTextField name="instagram_link" label="Instagram" />
        <RHFTextField name="twitter_link" label="Twitter" />
        <RHFTextField name="twitch_link" label="Twitch" />
        <RHFTextField name="discord_link" label="Discord" />
        <RHFTextField name="linkedin_link" label="Linkedin" />
        
      </Stack>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Create new member' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
