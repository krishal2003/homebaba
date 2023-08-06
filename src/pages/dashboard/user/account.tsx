/* eslint-disable import/no-cycle */
import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userAbout } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  AccountGeneral,
  AccountSocialLinks,
  AccountChangePassword,
} from '../../../sections/@dashboard/userlist/account';
import axiosInstance2 from 'src/utils/axios2';
import { IUserAccountList } from 'src/@types/user';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

UserAccountPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export type SocialMedia = {
  facebook_link: string;
  twitter_link: string;
  youtube_link: string;
  website_link: string;
  discord_link: string;
  linkedin_link: string;
  twitch_link: string;
  instagram_link: string;
  reddit_link: string;
};
export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');

  const [currentUser, setCurrentUser] = useState<IUserAccountList | undefined>(undefined);

  const [loadingUser, setLoadingUser] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/get-user-profile-detail/');

      setCurrentUser(response.data.user);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      setErrorMsg(error.message);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral currentUser={currentUser} />,
    },
    {
      value: 'social_links',
      label: 'Social links',
      icon: <Iconify icon="eva:share-fill" />,
      component: (
        <AccountSocialLinks
          socialLinks={{
            facebook_link: currentUser?.facebook_link || '',
            twitter_link: currentUser?.twitter_link || '',
            instagram_link: currentUser?.instagram_link || '',
            linkedin_link: currentUser?.linkedin_link || '',
            youtube_link: currentUser?.youtube_link || '',
            website_link: currentUser?.website_link || '',
            discord_link: currentUser?.discord_link || '',
            twitch_link: currentUser?.twitch_link || '',
            reddit_link: currentUser?.reddit_link || '',
          }}
        />
      ),
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Head>
        <title> User: Account Settings | Dmerce</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        />

        {loadingUser && <LoadingScreen />}

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {!loadingUser &&
          TABS.map(
            (tab) =>
              tab.value === currentTab && (
                <Box key={tab.value} sx={{ mt: 5 }}>
                  {tab.component}
                </Box>
              )
          )}
      </Container>
    </>
  );
}
