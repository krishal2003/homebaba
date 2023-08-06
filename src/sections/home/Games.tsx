import orderBy from 'lodash/orderBy';
// @mui
import { Box, Stack, Card, Avatar, CardHeader, Typography, CardProps, Grid } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  avatar: string;
  favourite: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function Games({ title, subheader, list, ...other }: Props) {
  return (
    <Box {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Grid container spacing={1} sx={{ p: 1 }}>
        {orderBy(list, ['favourite'], ['desc']).map((author, index) => (
          <Grid item xs={12} md={6}>
            <AuthorItem key={author.id} author={author} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

type AuthorItemProps = {
  author: ItemProps;
  index: number;
};

function AuthorItem({ author, index }: AuthorItemProps) {
  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={author.name} src={author.avatar} sx={{ borderRadius: 1 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{author.name}</Typography>

          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
            }}
          >
            <Iconify icon="ant-design:trophy-filled" width={16} sx={{ mr: 0.5 }} />
            {fShortenNumber(author.favourite)} Tournaments
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
