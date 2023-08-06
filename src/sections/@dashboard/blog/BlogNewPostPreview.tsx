// @mui
import { LoadingButton } from '@mui/lab';
import { alpha } from '@mui/material/styles';
import { Box, Button, Container, Typography, DialogActions, Dialog, Divider } from '@mui/material';
// @types
import { IBlogNewPost } from '../../../@types/blog';
// components
import Image from '../../../components/image';
import Markdown from '../../../components/markdown';
import Scrollbar from '../../../components/scrollbar';
import EmptyContent from '../../../components/empty-content';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  values: IBlogNewPost;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
};

export default function BlogNewPostPreview({
  open,
  values,
  isValid,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const { title = '', article_content = '', meta_description = '' } = values;

  const thumbnail_image =
    typeof values.thumbnail_image === 'string'
      ? values.thumbnail_image
      : values.thumbnail_image?.preview;

  const hasContent = title || article_content || thumbnail_image;

  const hasHero = title || thumbnail_image;

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Preview
        </Typography>

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Post
        </LoadingButton>
      </DialogActions>

      <Divider />

      {hasContent ? (
        <Scrollbar>
          {hasHero && <PreviewHero title={title} thumbnail_image={thumbnail_image} />}
          <Container sx={{ mt: 5, mb: 10 }}>
            <Typography variant="h6" sx={{ mb: 5 }}>
              {meta_description}
            </Typography>

            <Markdown children={article_content} />
          </Container>
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </Dialog>
  );
}

// ----------------------------------------------------------------------

type PreviewHeroProps = {
  title: string;
  thumbnail_image?: string;
};

function PreviewHero({ title, thumbnail_image }: PreviewHeroProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          pt: { xs: 3, lg: 10 },
        }}
      >
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Container>

      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 8,
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
        }}
      />
      <Image alt="thumbnail_image" src={thumbnail_image} ratio="16/9" />
    </Box>
  );
}
