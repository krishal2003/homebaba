// @mui
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  CardProps,
} from '@mui/material';
// utils
import { fToNow } from 'src/utils/formatTime';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  title: string;
  description: string;
  postedAt: number | Date;
  image: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function NewsUpdate({ title, subheader, list, ...other }: Props) {
  return (
    <Box>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {list.map((news) => (
              <NewsItem key={news.id} news={news} />
            ))}
          </Stack>
        </Scrollbar>

        <Divider />
        <Box sx={{ p: 1, pl: 2, textAlign: 'right' }}>
          <Link href={PATH_PAGE.comingSoon}>
            <Button
              size="small"
              color="inherit"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            >
              View all
            </Button>
          </Link>
        </Box>
      </Card>
    </Box>
  );
}

// ----------------------------------------------------------------------

type NewsItemProps = {
  news: ItemProps;
};

function NewsItem({ news }: NewsItemProps) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ pr: 3 }}>
      <Image
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240 }}>
        <Stack direction="column">
          <Link color="inherit" variant="subtitle2" noWrap sx={{ cursor: 'pointer' }}>
            {title}
          </Link>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {description}
          </Typography>
          <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
            {fToNow(postedAt)}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
