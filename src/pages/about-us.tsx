// next
import Head from 'next/head';
// layouts
import MainLayout from '../layouts/main';
// sections
import { AboutHero, AboutWhat, AboutTeam } from '../sections/about';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> About us | Dmerce</title>
      </Head>

      <AboutHero />
      <AboutWhat />

      <AboutTeam />
    </>
  );
}
