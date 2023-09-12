// next
import Head from 'next/head';
// @mui
import { Button } from '@mui/material';
// layouts
// components
import ScrollProgress from '../components/scroll-progress';
// sections
import Link from 'next/link';
import SimpleLayout from 'src/layouts/simple/SimpleLayout';
import Homebaba from './homebaba';
import MainLayout from 'src/layouts/main/MainLayout';

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
      <Homebaba/>
    </>
  );
}
