// next
import Head from 'next/head';
// layouts
import MainLayout from '../layouts/main';
// sections
import StoryHero from 'src/sections/story/StoryHero';

// ----------------------------------------------------------------------

Story.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function Story() {
  return (
    <>
      <Head>
        <title> Our Story | Dmerce</title>
      </Head>

      <StoryHero />

    </>
  );
}
