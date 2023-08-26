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

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <SimpleLayout> {page} </SimpleLayout>;

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
