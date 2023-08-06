import * as Yup from 'yup';
import { useState, useCallback, useMemo, useEffect } from 'react';

// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography } from '@mui/material';
// routes
import { paramCase } from 'change-case';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
// @types

import { PATH_PAGE } from 'src/routes/paths';
import { IBlogNewPost, IBlogPost } from '../../../@types/blog';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type FormValuesProps = IBlogNewPost;

type Props = {
  isEdit?: boolean;
  currentPost?: IBlogPost;
};

export default function BlogNewPostForm({ isEdit, currentPost }: Props) {
  const { push } = useRouter();

  const [TAGS_OPTION, SET_TAGS_OPTION] = useState<{ tag_name: string }[]>([]);
  const [CATEGORY_OPTION, SET_CATEGORY_OPTION] = useState<{ category_name: string }[]>([]);

  const [loading, setLoading] = useState(true);

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/article-category-tags/');
      SET_TAGS_OPTION(response.data.tags);
      SET_CATEGORY_OPTION(response.data.categories);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const { enqueueSnackbar } = useSnackbar();

  const [openPreview, setOpenPreview] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    meta_title: Yup.string().required('Title is required'),
    meta_description: Yup.string().required('Description is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    categories: Yup.array().min(1, 'Must have at least 1 category'),
    thumbnail_image: Yup.mixed().required('Cover is required'),
    thumbnail_image_alt_description: Yup.string().required(
      'Image Alternative Description is required'
    ),
    article_content: Yup.string().required('Content is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      article_content: currentPost?.article_content || '',
      thumbnail_image: currentPost?.thumbnail_image
        ? `${BASE_IMAGE_PATH + currentPost.thumbnail_image}`
        : null,
      thumbnail_image_alt_description: currentPost?.thumbnail_image_alt_description || '',
      tags: currentPost?.tags || [],
      categories: currentPost?.categories || [],
      is_published: currentPost?.is_published || true,
      is_featured: currentPost?.is_featured || false,
      meta_title: currentPost?.meta_title || '',
      meta_description: currentPost?.meta_description || '',
    }),
    [currentPost]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    if (isEdit && currentPost) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPost]);

  const values = watch();

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('slug', paramCase(data.title));
    formData.append('title', data.title);
    formData.append('thumbnail_image_alt_description', data.thumbnail_image_alt_description);
    formData.append('thumbnail_image', data.thumbnail_image as Blob);
    formData.append('article_content', data.article_content);
    formData.append('is_featured', data.is_featured ? 'True' : 'False');
    formData.append('is_published', data.is_published ? 'True' : 'False');
    formData.append('meta_title', data.meta_title);
    formData.append('meta_description', data.meta_description);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.categories.length; i++) {
      formData.append('categories', data.categories[i]);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.tags.length; i++) {
      formData.append('tags', data.categories[i]);
    }

    if (isEdit) {
      formData.append('id', `${currentPost!.id}`);
      axiosInstance2
        .post('/update-article/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          handleClosePreview();
          enqueueSnackbar(res.data.success);
          push(PATH_PAGE.blog.root);
        })
        .catch((error) => console.error(error));
    } else {
      axiosInstance2
        .post('/create-article/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          handleClosePreview();
          enqueueSnackbar(res.data.success);
          push(PATH_PAGE.blog.root);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('thumbnail_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('thumbnail_image', null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Post Title" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Content
                </Typography>

                <RHFEditor simple name="article_content" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Thumbnail Image
                </Typography>

                <RHFUpload
                  name="thumbnail_image"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
                <RHFTextField name="thumbnail_image_alt_description" label="Image Description" />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <RHFSwitch
                  name="is_published"
                  label="Publish"
                  labelPlacement="start"
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
                <RHFSwitch
                  name="is_featured"
                  label="Featured"
                  labelPlacement="start"
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              </div>

              <RHFAutocomplete
                name="tags"
                label="Tags"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option.tag_name)}
                ChipProps={{ size: 'small' }}
              />
              <RHFAutocomplete
                name="categories"
                label="Category"
                multiple
                freeSolo
                options={CATEGORY_OPTION.map((option) => option.category_name)}
                ChipProps={{ size: 'small' }}
              />

              <RHFTextField name="meta_title" label="Meta title" />

              <RHFTextField
                name="meta_description"
                label="Meta description"
                fullWidth
                multiline
                rows={3}
              />
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              onClick={handleOpenPreview}
            >
              Preview
            </Button>

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Post
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>

      <BlogNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}
