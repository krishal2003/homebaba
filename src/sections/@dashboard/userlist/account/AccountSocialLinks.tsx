// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
// eslint-disable-next-line import/no-cycle
import { SocialMedia } from 'src/pages/dashboard/user/account';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: 'facebook_link',
    icon: <Iconify icon="eva:facebook-fill" width={24} />,
  },
  {
    value: 'instagram_link',
    icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
  },
  {
    value: 'linkedin_link',
    icon: <Iconify icon="eva:linkedin-fill" width={24} />,
  },
  {
    value: 'twitter_link',
    icon: <Iconify icon="eva:twitter-fill" width={24} />,
  },
  {
    value: 'twitch_link',
    icon: <Iconify icon="mdi:twitch" width={24} />,
  },
  {
    value: 'youtube_link',
    icon: <Iconify icon="akar-icons:youtube-fill" width={24} />,
  },
  {
    value: 'discord_link',
    icon: <Iconify icon="ic:baseline-discord" width={24} />,
  },
  {
    value: 'reddit_link',
    icon: <Iconify icon="ic:baseline-reddit" width={24} />,
  },
  {
    value: 'website_link',
    icon: <Iconify icon="eva:email-fill" width={24} />,
  },
] as const;

// ----------------------------------------------------------------------

type FormValuesProps = SocialMedia;

type Props = {
  socialLinks?: SocialMedia;
};

export default function AccountSocialLinks({ socialLinks }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: FormValuesProps = {
    facebook_link: socialLinks?.facebook_link || '',
    instagram_link: socialLinks?.instagram_link || '',
    linkedin_link: socialLinks?.linkedin_link || '',
    twitter_link: socialLinks?.twitter_link || '',
    twitch_link: socialLinks?.twitch_link || '',
    discord_link: socialLinks?.discord_link || '',
    reddit_link: socialLinks?.reddit_link || '',
    website_link: socialLinks?.website_link || '',
    youtube_link: socialLinks?.youtube_link || '',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>,
              }}
            />
          ))}

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
