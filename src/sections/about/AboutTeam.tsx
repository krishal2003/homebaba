import { m } from 'framer-motion';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
// _mock_
import Image from '../../components/image';
import Carousel from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef<Carousel>(null);

  const theme = useTheme();

  const carouselSettings = {
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Great team is the key
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Dmerce will provide you support if you have any problems, our support team will reply
          within a day.
        </Typography>
      </m.div>

        <Stack
          spacing={1.5}
          direction={{ xs: 'column', sm: 'row-reverse' }}
          justifyContent="center"
          sx={{ mb: 5, pt: 5 }}
        >
          <MemberCard />
        </Stack>
    </Container>  
  );
}

// ----------------------------------------------------------------------

function MemberCard() {
  return (
    <Box display="flex" gap={5} justifyContent="center">
      <Stack
        direction={{ sm: 'row', xm: 'column' }}
        spacing={1.5}
        gap={5}
        justifyContent="center"
        sx={{ mb: 5, pt: 5 }}
      >
        <Card sx={{ width: '320px', height: '400px' }}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
            Krishal Basnet{' '}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Founder
          </Typography>

          <Box sx={{ px: 1 }}>
            <Image alt="krishal" src="/assets/krishal.jpg/" ratio="1/1" sx={{ borderRadius: 2 }} />
          </Box>
        </Card>
        <Card sx={{ width: '320px', height: '400px' }}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
            Aayush Sharma{' '}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Co-Founder
          </Typography>

          <Box sx={{ px: 1 }}>
            <Image alt="ayush" src="/assets/aayush.jpg/" ratio="1/1" sx={{ borderRadius: 2 }} />
          </Box>
        </Card>
        <Card sx={{ width: '320px', height: '400px' }}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
            Utkarsha Khadka{' '}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Co-Founder
          </Typography>

          <Box sx={{ px: 1 }}>
            <Image alt="ayush" src="/utkarsha.jpg/" ratio="1/1" sx={{ borderRadius: 2 }} />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

