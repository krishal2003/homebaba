import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack, Grid, IconButton } from '@mui/material';
// routes
import _mock from 'src/_mock/_mock';
import { _socials } from 'src/_mock/arrays';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// theme
import { secondaryFont } from '../../theme/typography';
// components
import Iconify from '../../components/iconify';
import { MotionContainer, varFade } from '../../components/animate';
import SponsorCarousel from '../_examples/extra/carousel/SponsorCarousel';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: theme.spacing(15),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: secondaryFont.style.fontFamily,
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.on('change', (scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  return (
    <>
      <StyledRoot sx={{ ...(hide && { opacity: 0 }) }}>
        <Container component={MotionContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
               <Description />
            </Grid>

            <Grid item xs={12} md={7}>
              <Content />
            </Grid>
          </Grid>
        </Container>
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography variant="h2">
          Experience seamless
          <br />
          shopping with{' '}
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          DMERCE
        </StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: 'row', sm: 'row' }} sx={{ mb: 5 }}>
          <Stack alignItems="center" spacing={2}>
            <Button
              component={NextLink}
              href="/shop"
              color="inherit"
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                },
              }}
            >
              Explore Now!{' '}
            </Button>
          </Stack>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            href={PATH_PAGE.about}
            sx={{ borderColor: 'text.primary' }}
          >
            About Us
          </Button>
        </Stack>
      </m.div>
      <Stack spacing={1} sx={{ textAlign: 'left', opacity: 0.48 }}>
        <m.div variants={varFade().in}>
          <Typography variant="overline">Connect with us!</Typography>
        </m.div>

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
      </Stack>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const _carouselsExample = [...Array(5)].map((_, index) => ({
    id: _mock.id(index),
    title: _mock.text.title(index),
    sponsor: _mock.image.sponsor(index),
    description: _mock.text.description(index),
    link: _mock.link(index),
  }));

  return (
    <Grid
      container
      spacing={3}
      sx={{
        py: { xs: 0, md: 10 },
        pb: { xs: 3 },
      }}
    >
      <Grid item xs={12}>
        <Box sx={{ pt: 5 }}>
          <SponsorCarousel data={_carouselsExample} />
        </Box>
      </Grid>
    </Grid>
  );
}
