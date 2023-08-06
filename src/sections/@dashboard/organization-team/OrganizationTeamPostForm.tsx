import * as Yup from 'yup';
import { useState, useCallback, useMemo, useEffect } from 'react';

// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography, MenuItem, Divider } from '@mui/material';
// routes
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
// @types

import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFSelect,
  RHFMultiSelect,
} from '../../../components/hook-form';
//
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { CustomFile } from 'src/components/upload';
import { OrganizationTeam } from 'src/@types/organizationTeam';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type FormValuesProps = {
  team_name: string;
  team_image: CustomFile | string | null;
  game_id: string;
  team_type: string;
  manager: string;
  players: string[];
};

type Player = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: null | string;
  email: string;
};

type Props = {
  isEdit?: boolean;
  currentOrganizationTeam?: OrganizationTeam;
};

export default function OrganizationTeamPostForm({ isEdit, currentOrganizationTeam }: Props) {
  const { push } = useRouter();

  const [FREE_PLAYERS, SET_FREE_PLAYERS] = useState<Player[]>([]);
  const [GAME_OPTIONS, SET_GAMES] = useState<{ id: string; game_name: string }[]>([]);

  const [loading, setLoading] = useState(true);

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/create-team-initials/');
      SET_FREE_PLAYERS(response.data.free_players);
      SET_GAMES(response.data.games);
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

  const NewBlogSchema = Yup.object().shape({
    team_name: Yup.string().required('Team name is required'),
    team_type: Yup.string().required('Team type is required'),
    game_id: Yup.string().required('Game is required'),
    manager: Yup.string().required('Manager is required'),
    players: Yup.array().min(2, 'Must have at least 2 players'),
    team_image: Yup.mixed().required('Team Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      team_name: currentOrganizationTeam?.team_name || '',
      game_id: currentOrganizationTeam?.game.id || '',
      manager: currentOrganizationTeam?.manager.id || '',
      team_type: currentOrganizationTeam?.team_type || '',
      players: currentOrganizationTeam?.players.map((player) => `${player.id}`) || [],
      team_image: currentOrganizationTeam?.team_image
        ? `${BASE_IMAGE_PATH + currentOrganizationTeam.team_image}`
        : null,
    }),
    [currentOrganizationTeam]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentOrganizationTeam) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentOrganizationTeam]);

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();

    console.log(data);
    formData.append('team_name', data.team_name);
    formData.append('team_image', data.team_image as Blob);
    formData.append('game_id', data.game_id);
    formData.append('manager', data.manager);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.players.length; i++) {
      formData.append('players', data.players[i]);
    }

    if (isEdit) {
      formData.append('id', `${currentOrganizationTeam?.id}`);
      axiosInstance2
        .post(`/update-team/?id=${currentOrganizationTeam?.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.organization.team.list);
        })
        .catch((error) => enqueueSnackbar(error.data.error));
    } else {
      axiosInstance2
        .post('/create-team/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.organization.team.list);
        })
        .catch((error) => enqueueSnackbar(error.data.error));
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('team_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('team_image', null);
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
              <RHFTextField name="team_name" label="Team Name" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Team Image
                </Typography>

                <RHFUpload
                  name="team_image"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSelect name="team_type" label="Team Type">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <MenuItem value="Duo">Duo</MenuItem>
                <MenuItem value="Squad">Squad</MenuItem>
              </RHFSelect>

              <RHFMultiSelect
                chip
                checkbox
                name="players"
                label="Players"
                options={[
                  ...FREE_PLAYERS,
                  ...(currentOrganizationTeam?.players ? currentOrganizationTeam.players : []),
                ].map((player) => ({
                  label: `${player.first_name} ${player.last_name}`,
                  value: `${player.id}`,
                }))}
              />
              <RHFSelect name="manager" label="Manager">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem
                  key={currentOrganizationTeam?.manager.id}
                  value={currentOrganizationTeam?.manager.id}
                >
                  {currentOrganizationTeam?.manager.first_name}{' '}
                  {currentOrganizationTeam?.manager.last_name}
                </MenuItem>
                {FREE_PLAYERS.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.first_name} {option.last_name}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="game_id" label="Games">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />

                {GAME_OPTIONS.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.game_name}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
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
    </FormProvider>
  );
}
