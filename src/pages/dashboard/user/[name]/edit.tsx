// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/userlist/UserNewEditForm';
import { IUserAccountList } from 'src/@types/user';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance2 from 'src/utils/axios2';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();

  const [currentUser, setCurrentUser] = useState<IUserAccountList | undefined>(undefined);

  const [loadingUser, setLoadingUser] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/get-user-detail/', {
        params: { name },
      });

      setCurrentUser(response.data.user);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      setErrorMsg(error.message);
    }
  }, [name]);

  useEffect(() => {
    if (name) {
      getUser();
    }
  }, [getUser, name]);

  return (
    <>
      <Head>
        <title> User: Edit user | Dmerce</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: `${currentUser?.first_name} ${currentUser?.last_name}` },
          ]}
        />
        {loadingUser && <LoadingScreen />}
        {!loadingUser && <UserNewEditForm isEdit currentUser={currentUser} />}
      </Container>
    </>
  );
}
