import { m } from 'framer-motion';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card, Paper, Button, Typography, CardContent } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
// components
import Image from '../../../../components/image';
import { MotionContainer, varFade } from '../../../../components/animate';
import Carousel, { CarouselArrowIndex } from '../../../../components/carousel';
import Link from 'next/link';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    sponsor: string;
    link: string;
  }[];
};

export default function CarouselAnimation({ data }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? data.length - 1 : 0);

  const carouselSettings = {
    speed: 500,
    dots: false,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} item={item} isActive={index === currentIndex} />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={data.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    title: string;
    link: string;
    sponsor: string;
  };
  isActive: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const theme = useTheme();

  const { sponsor, title, link } = item;

  return (
    <Paper sx={{ position: 'relative' }}>
      <Image alt={title} src={sponsor} ratio="16/9" />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      />

      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: 1,
          maxWidth: 720,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="h3" gutterBottom>
            {item.title}
          </Typography>
        </m.div>

        <Box >
          <Link href={link} style={{ textDecoration: 'none', color: 'white' }}>
            <m.div variants={varFade().inRight}>
              <Button variant="contained" sx={{ mt: 0 }}>
                View More
              </Button>
            </m.div>
          </Link>
        </Box>
      </CardContent>
    </Paper>
  );
}
