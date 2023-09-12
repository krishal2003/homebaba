// next
import NextLink from 'next/link';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Quick Links',
    children: [
      { name: 'Home', href: PATH_PAGE.home },
      { name: 'Shop', href: PATH_PAGE.shop },
      { name: 'About us', href: PATH_PAGE.about },
      { name: 'Contact us', href: PATH_PAGE.contact },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Privacy Policy', href: PATH_PAGE.privacy },
      { name: 'Cookie Policy', href: PATH_PAGE.cookie },
      { name: 'Terms and Condition', href: PATH_PAGE.terms },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: '+02 814568104561045614510', href: 'tel:471154002' },
      { name: 'homebaba.ca@gmail.com', href: 'mailto:homebabba.np@gmail.com' },
      { name: 'Montreal, Canada', href: '#' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Experience the Ultimate Online Rental House and Condos with Confidence and
              Convenience!
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton key={social.name} href={social.path} target="_blank" rel="noopener">
                  <Iconify icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              justifyContent="space-between"
              direction={{ xs: 'column', md: 'row' }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={NextLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 1,
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          © Homebaba {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
