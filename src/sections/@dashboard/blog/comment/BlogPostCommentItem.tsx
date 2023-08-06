import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Button,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  avatarUrl: string;
  message: string;
  tagUser?: string;
  postedAt: Date;
  hasReply?: boolean;
};

export default function BlogPostCommentItem({
  name,
  avatarUrl,
  message,
  tagUser,
  postedAt,
  hasReply,
}: Props) {
  const [openReply, setOpenReply] = useState(false);

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
          ...(hasReply && {
            ml: 8,
          }),
        }}
      >
        <Avatar
          alt={name}
          src={BASE_IMAGE_PATH + avatarUrl}
          sx={{ mr: 2, width: 48, height: 48 }}
        />

        <Stack>
          <Typography variant="subtitle1"> {name} </Typography>

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fDate(postedAt)}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {message}
          </Typography>
        </Stack>

        {!hasReply && (
          <Button
            size="small"
            onClick={() => setOpenReply(!openReply)}
            sx={{ right: 0, position: 'absolute' }}
          >
            Reply
          </Button>
        )}
      </ListItem>

      {openReply && (
        <Box
          sx={{
            mb: 3,
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          <TextField fullWidth size="small" placeholder="Write comment" />
        </Box>
      )}

      <Divider
        sx={{
          ...(hasReply && {
            ml: 7,
          }),
        }}
      />
    </>
  );
}
