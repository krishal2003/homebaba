// next
import Head from 'next/head';
// @mui
import { Button } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// components
import ScrollProgress from '../components/scroll-progress';
// sections
import Link from 'next/link';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title>HOMEBABA </title>
      </Head>

      <ScrollProgress />
      <Link href="/homebaba">
        <Button sx={{mt:10, ml:'10'}} variant='outlined'> Go to Homebaba</Button>
      </Link>
    </>
  );
}
