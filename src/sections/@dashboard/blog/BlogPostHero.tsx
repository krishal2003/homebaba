// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';
// hooks
// import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
// _mock
// import { _socials } from '../../../_mock/arrays';
// @types
import { IBlogPost } from '../../../@types/blog';
// components
import Image from '../../../components/image';
// import Iconify from '../../../components/iconify';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h3,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    ...theme.typography.h2,
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const StyledFooter = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  post: IBlogPost;
};

export default function BlogPostHero({ post }: Props) {
  const { thumbnail_image, thumbnail_image_alt_description, title, author, created_at } = post;

  // const isDesktop = useResponsive('up', 'sm');

  console.log(thumbnail_image);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        borderRadius: {
          xs: `16px 16px 16px 16px`,
          md: `16px 16px 0 0`,
        },
      }}
    >
      <StyledTitle>{title}</StyledTitle>

      <StyledFooter>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={author.first_name} src={author.avatar} sx={{ width: 48, height: 48 }} />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {`${author.first_name} ${author.last_name}`}
            </Typography>

            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDate(created_at)}
            </Typography>
          </Box>
        </Box>

        {/* TODO update this later on 
        <SpeedDial
          direction={isDesktop ? 'left' : 'up'}
          ariaLabel="Share post"
          icon={<Iconify icon="eva:share-fill" />}
          sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
        >
          {_socials.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={<Iconify icon={action.icon} sx={{ color: action.color }} />}
              tooltipTitle={action.name}
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
          ))}
        </SpeedDial> */}
      </StyledFooter>

      <StyledOverlay />

      <Image
        alt={thumbnail_image_alt_description}
        src={BASE_IMAGE_PATH + thumbnail_image}
        ratio="16/9"
      />
    </Box>
  );
}
