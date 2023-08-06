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
import { useCallback, useEffect, useState } from 'react';
import axiosInstance2 from 'src/utils/axios2';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { OrganizationTeam } from 'src/@types/organizationTeam';
import OrganizationTeamPostForm from 'src/sections/@dashboard/organization-team/OrganizationTeamPostForm';

// ----------------------------------------------------------------------

OrganizationEditTeam.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function OrganizationEditTeam() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const [currentUser, setCurrentUser] = useState<OrganizationTeam | undefined>(undefined);

  const [loadingUser, setLoadingUser] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/retrieve-team-detail', {
        params: { id },
      });

      setCurrentUser(response.data.team_detail);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      setErrorMsg(error.message);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [getUser, id]);

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
              name: 'Team List',
              href: PATH_DASHBOARD.organization.team.list,
            },
            { name: currentUser?.team_name },
          ]}
        />
        {loadingUser && <LoadingScreen />}
        {!loadingUser && <OrganizationTeamPostForm isEdit currentOrganizationTeam={currentUser} />}
      </Container>
    </>
  );
}
