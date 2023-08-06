import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Avatar,
  Typography,
  CardContent,
  Link,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { IBlogPost } from '../../../@types/blog';
// components
import Image from '../../../components/image';
import TextMaxLine from '../../../components/text-max-line';
import SvgColor from '../../../components/svg-color';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import ConfirmDialog from 'src/components/confirm-dialog/ConfirmDialog';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type Props = {
  post: IBlogPost;
  index?: number;
  isDashboard?: boolean;
};

export default function BlogPostCard({ post, index, isDashboard }: Props) {
  const isDesktop = useResponsive('up', 'md');

  const [openConfirm, setOpenConfirm] = useState(false);

  const { thumbnail_image, title, author, created_at, thumbnail_image_alt_description, slug } =
    post;

  const latestPost = index === 0 || index === 1 || index === 2;

  const { push } = useRouter();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = async () => {
    axiosInstance2
      .delete('/delete-article/', {
        params: {
          slug,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data.success);
        push(PATH_DASHBOARD.blog.root);
      })
      .catch((error) => console.error(error));
  };

  if (isDesktop && latestPost) {
    return (
      <>
        <Card>
          <Avatar
            alt={author.user_name}
            src={BASE_IMAGE_PATH + author.avatar}
            sx={{
              top: 24,
              left: 24,
              zIndex: 9,
              position: 'absolute',
            }}
          />

          <PostContent
            title={title}
            created_at={created_at}
            index={index}
            handleOpenConfirm={handleOpenConfirm}
            isDashboard={isDashboard}
            slug={slug}
          />

          <StyledOverlay />

          <Image
            alt={thumbnail_image_alt_description}
            src={BASE_IMAGE_PATH + thumbnail_image}
            sx={{ height: 360 }}
          />
        </Card>
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Delete"
          content={<>Are you sure want to delete items?</>}
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onDelete();
                handleCloseConfirm();
              }}
            >
              Delete
            </Button>
          }
        />
      </>
    );
  }

  return (
    <>
      <Card>
        <Box sx={{ position: 'relative' }}>
          <SvgColor
            src="/assets/shape_avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />

          <Avatar
            alt={author.user_name}
            src={BASE_IMAGE_PATH + author.avatar}
            sx={{
              left: 24,
              zIndex: 9,
              width: 32,
              height: 32,
              bottom: -16,
              position: 'absolute',
            }}
          />

          <Image
            alt={thumbnail_image_alt_description}
            src={BASE_IMAGE_PATH + thumbnail_image}
            ratio="4/3"
          />
        </Box>

        <PostContent
          title={title}
          created_at={created_at}
          isDashboard={isDashboard}
          handleOpenConfirm={handleOpenConfirm}
          slug={slug}
        />
      </Card>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={<>Are you sure want to delete items?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  title: string;
  isDashboard?: boolean;
  created_at: Date | string | number;
  index?: number;
  slug: string;
  handleOpenConfirm: () => void;
};

export function PostContent({
  title,
  created_at,
  index,
  isDashboard,
  handleOpenConfirm,
  slug,
}: PostContentProps) {
  const isDesktop = useResponsive('up', 'md');

  const linkTo = PATH_PAGE.blog.view(paramCase(title));

  const latestPostLarge = index === 0;

  const latestPostSmall = index === 1 || index === 2;

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack>
        <Typography
          gutterBottom
          variant="caption"
          component="div"
          sx={{
            color: 'text.disabled',
            ...((latestPostLarge || latestPostSmall) && {
              opacity: 0.64,
              color: 'common.white',
            }),
          }}
        >
          {fDate(created_at)}
        </Typography>

        <Link component={NextLink} href={linkTo} color="inherit">
          <TextMaxLine
            variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}
            line={2}
            persistent
          >
            {title}
          </TextMaxLine>
        </Link>
      </Stack>
      <Stack>
        {isDashboard && (
          <Stack spacing={2} direction="row">
            <IconButton size="small" href={PATH_DASHBOARD.blog.edit(slug)} color="info">
              <Iconify icon="material-symbols:edit" width={24} />
            </IconButton>
            <IconButton size="small" onClick={handleOpenConfirm} color="error">
              <Iconify icon="material-symbols:delete" width={24} />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </CardContent>
  );
}
