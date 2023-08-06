import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { SkeletonPostDetails } from '../../../../components/skeleton';
// sections
import { BlogNewPostForm } from '../../../../sections/@dashboard/blog';
import { IBlogPost } from '../../../../@types/blog';
import axiosInstance2 from 'src/utils/axios2';

// ----------------------------------------------------------------------

BlogEditPostPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function BlogEditPostPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { slug },
  } = useRouter();

  const [post, setPost] = useState<IBlogPost | undefined>(undefined);

  const [loadingPost, setLoadingPost] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/article/', {
        params: { slug },
      });

      setPost(response.data.post);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setErrorMsg(error.message);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      getPost();
    }
  }, [getPost, slug]);

  return (
    <>
      <Head>
        <title> Blog: Edit | Dmerce</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit post"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Blog',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: post?.title,
            },
          ]}
        />

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}

        <BlogNewPostForm isEdit currentPost={post} />
      </Container>
    </>
  );
}
