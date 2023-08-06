// @mui
import { Grid } from '@mui/material';
// @types
import { IUserProfile } from '../../../../../@types/user';
//
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type Props = {
  info: IUserProfile;
};

export default function Profile({ info }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileAbout
          quote={info.quote}
          country={info.country}
          email={info.email}
          role={info.role}
          company={info.company}
          school={info.school}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ProfileSocialInfo socialLinks={info.socialLinks} />
      </Grid>
    </Grid>
  );
}
