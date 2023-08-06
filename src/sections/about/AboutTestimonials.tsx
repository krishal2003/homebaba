import { m } from 'framer-motion';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Paper, Rating, Container, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur, bgGradient } from '../../utils/cssStyles';
import { fDate } from '../../utils/formatTime';
// components
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';
import ConfirmDialog from 'src/components/confirm-dialog';
import { useCallback, useEffect, useState } from 'react';
import TestimonialsForm from './@Testimonials/TestimonialsForm';
import { useAuthContext } from 'src/auth/useAuthContext';
import { PATH_AUTH } from 'src/routes/paths';
import axiosInstance2 from 'src/utils/axios2';
import { ITestimonial } from 'src/@types/testimonial';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/images/about/testimonials.jpg',
  }),
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    height: 840,
    textAlign: 'left',
    overflow: 'hidden',
  },
}));

// ----------------------------------------------------------------------

export default function AboutTestimonials() {
  const [testimonialList, setTestimonialList] = useState<ITestimonial[]>([]);

  const getTestimonialList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/testimonials/');
      setTestimonialList(response.data.testimonials);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    getTestimonialList();
  }, [getTestimonialList]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport} sx={{ position: 'relative', height: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              <m.div variants={varFade().inUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: 'text.secondary' }}
                >
                  Testimonials
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3, color: 'common.white' }}>
                  What people say about us
                </Typography>
              </m.div>

              {!isDesktop && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <AddTestimonial handleOpenConfirm={handleOpenConfirm} />
                </Box>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: 'absolute' },
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {testimonialList.slice(0, 3).map((testimonial) => (
                  <m.div key={testimonial.id} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </m.div>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {testimonialList.slice(3, 6).map((testimonial) => (
                  <m.div key={testimonial.id} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </m.div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {isDesktop && (
          <Box sx={{ bottom: 60, position: 'absolute' }}>
            <m.div variants={varFade().inLeft}>
              <AddTestimonial handleOpenConfirm={handleOpenConfirm} />
            </m.div>
          </Box>
        )}
      </Container>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Share Your Thoughts on Dmerce"
        content={<TestimonialsForm />}
        maxWidth="md"
      />
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

type Props = {
  testimonial: ITestimonial;
};

function TestimonialCard({ testimonial }: Props) {
  const theme = useTheme();

  const { created_at, description, rating, user } = testimonial;

  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: 'common.white',
        ...bgBlur({
          color: theme.palette.common.white,
          opacity: 0.04,
        }),
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {`${user.first_name} ${user.last_name}`}
      </Typography>

      <Typography gutterBottom component="div" variant="caption" sx={{ color: 'grey.500' }}>
        {fDate(created_at)}
      </Typography>

      <Rating value={rating} readOnly size="small" />

      <Typography variant="body2" sx={{ mt: 1.5 }}>
        {description}
      </Typography>
    </Paper>
  );
}

// ----------------------------------------------------------------------

type TestimonialLinkProps = {
  handleOpenConfirm: () => void;
};

function AddTestimonial({ handleOpenConfirm }: TestimonialLinkProps) {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return (
      <Button
        variant="text"
        sx={{ display: 'flex', alignItems: 'center' }}
        onClick={handleOpenConfirm}
      >
        Share your views <Iconify icon="ic:round-arrow-right-alt" sx={{ ml: 1 }} />
      </Button>
    );
  }
  return (
    <Button variant="text" sx={{ display: 'flex', alignItems: 'center' }} href={PATH_AUTH.login}>
      Login to Share Your View
    </Button>
  );
}
