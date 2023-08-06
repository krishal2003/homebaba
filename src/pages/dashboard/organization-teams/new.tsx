// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';
import OrganizationTeamPostForm from 'src/sections/@dashboard/organization-team/OrganizationTeamPostForm';

// ----------------------------------------------------------------------

BlogNewPostPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogNewPostPage() {
  return (
    <>
      <Head>
        <title> Organizer: New Team | Dmerce</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Create a new team"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Team',
              href: PATH_DASHBOARD.organization.team.list,
            },
            {
              name: 'Create',
            },
          ]}
        />

        <OrganizationTeamPostForm />
      </Container>
    </>
  );
}
