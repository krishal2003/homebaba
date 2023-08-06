// @mui
import { Box, List } from '@mui/material';
// @types
import { IBlogPostComment } from '../../../../@types/blog';
//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------

type Props = {
  comments: IBlogPostComment[];
};

export default function BlogPostCommentList({ comments }: Props) {
  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id, replies, body, created_at, user } = comment;

        const hasReply = replies.length > 0;

        return (
          <Box key={id}>
            <BlogPostCommentItem
              // eslint-disable-next-line no-restricted-globals
              name={`${user.first_name} ${user.last_name}`}
              message={body}
              postedAt={created_at}
              avatarUrl={user.avatar}
            />
            {hasReply &&
              replies.map((reply) => (
                <BlogPostCommentItem
                  key={reply.id}
                  name={`${reply.user.first_name} ${reply.user.last_name}` || reply.user.username}
                  message={reply.body}
                  postedAt={reply.created_at}
                  avatarUrl={reply.user.avatar || ''}
                  hasReply
                />
              ))}
          </Box>
        );
      })}
    </List>
  );
}
