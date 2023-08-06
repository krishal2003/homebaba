// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import { useCallback, useEffect, useState } from 'react';
import { IBlogPost } from 'src/@types/blog';
import { SkeletonPostDetails } from 'src/components/skeleton';
import { BlogPostCard } from '../@dashboard/blog';
import { MotionViewport } from '../../components/animate';
import axiosInstance2 from 'src/utils/axios2';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<IBlogPost[]>([]);

  const [loadingPost, setLoadingPost] = useState(true);

  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/articles/');
      setRecentPosts(response.data.posts);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
    }
  }, []);

  useEffect(() => {
    getRecentPosts();
  }, [getRecentPosts]);

  if (!loadingPost && recentPosts) return null;

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        {loadingPost && (
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
          >
            {[...Array(4)].map(() => (
              <SkeletonPostDetails />
            ))}
          </Box>
        )}

        {recentPosts.length ? (
          <>
            <Typography variant="h4" sx={{ my: 5 }}>
              Recent posts
            </Typography>

            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              }}
            >
              {recentPosts.slice(recentPosts.length - 4).map((recentPost) => (
                <BlogPostCard key={recentPost.id} post={recentPost} />
              ))}
            </Box>
          </>
        ) : null}
      </Container>
    </StyledRoot>
  );
}
