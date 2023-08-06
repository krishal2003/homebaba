// next
import Head from 'next/head';
// @mui
import { Box, Container, Typography } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import PrivacyFAQ from 'src/sections/privacy/PrivacyFAQ';
import Link from 'next/link';
// ----------------------------------------------------------------------

PrivacyPolicy.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

interface DateObject {
  date: string;
}

function getDate(): DateObject {
  const date: Date = new Date('May 5, 2023');
  return { date: date.toLocaleDateString() };
}

const myDate: DateObject = getDate();

function privacy(): string {
  const privacyPolicy: string = `
       Dmerce's Privacy Policy describes how Dmerce collects, uses, and shares your personal
            data. In addition to this Privacy Policy, we provide data and privacy information
            embedded in our products and certain features that ask to use your personal data.
  `;
  return privacyPolicy;
}

const privacyPolicy: string = privacy();
export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title> Privacy Policy | Dmerce</title>
      </Head>

      <Container sx={{ pt: 1, pb: 10, position: 'relative' }}>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', pt: 3 }}>
            Dmerce Privacy Policy
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Last Updated: {myDate.date}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', pt: 5 }}>
            {privacyPolicy}
          </Typography>
          <Link href="/" target="_blank">
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                pt: 3,
                color: 'blue',
                textDecoration: 'underline',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              Download a copy of this Privacy Policy (PDF)
            </Typography>
          </Link>
        </Box>

        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1 , 1fr)',
          }}
          sx={{ pt: 3 }}
        >
          <PrivacyFAQ />
        </Box>
      </Container>
    </>
  );
}
