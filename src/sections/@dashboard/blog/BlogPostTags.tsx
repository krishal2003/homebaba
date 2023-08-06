// @mui
import { Chip, Stack, Typography } from '@mui/material';
// utils
// @types
import { IBlogPost } from '../../../@types/blog';
// components

// ----------------------------------------------------------------------

type Props = {
  tags: IBlogPost['tags'];
};

export default function BlogPostTags({ tags }: Props) {
  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      <Typography variant="button">Tags:</Typography>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
      ))}
    </Stack>
  );
}
