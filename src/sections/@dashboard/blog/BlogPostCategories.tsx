// @mui
import { Chip, Stack, Typography } from '@mui/material';
// utils
// @types
import { IBlogPost } from '../../../@types/blog';
// components

// ----------------------------------------------------------------------

type Props = {
  categories: IBlogPost['categories'];
};

export default function BlogPostCategories({ categories }: Props) {
  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      <Typography variant="button">Categories:</Typography>
      {categories.map((category) => (
        <Chip key={category} label={category} sx={{ m: 0.5 }} />
      ))}
    </Stack>
  );
}
