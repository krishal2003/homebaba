// next
import Head from 'next/head';
// @mui
import { Stack, Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import OrganizationalChart from '../../../components/organizational-chart';
// sections
import { Block } from '../../../sections/_examples/Block';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { Team } from 'src/utils/teamsToChart';

// ----------------------------------------------------------------------

PlayerList.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PlayerList() {
  const [data, setData] = useState<any>();

  const getAllPlayers = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/organization-players');
      setData(convertDataForChart(response.data.teams));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllPlayers();
  }, [getAllPlayers]);

  return (
    <>
      <Head>
        <title> Organizational Chart | Dmerce</title>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Organizational Chart"
          links={[
            { name: 'Components', href: PATH_PAGE.components },
            { name: 'Organizational Chart' },
          ]}
        />

        <Stack spacing={5}>
          {data && (
            <Block title="Teams" sx={{ overflow: 'auto' }}>
              <OrganizationalChart data={data} variant="group" lineHeight="64px" />
            </Block>
          )}
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const createData = (name: string, group: string, role: string | null, avatar: string | null) => ({
  name,
  group,
  role,
  avatar,
});

function convertDataForChart(data: Team[]): any {
  const chartData = {
    ...createData(
      data[0].organization.organization_name,
      'root',
      'Organization',
      BASE_IMAGE_PATH + data[0].organization.user.avatar
    ),
    children: [],
  };

  const gameMap: { [key: string]: any } = {}; // Map to track game nodes

  const addChild = (parent: any, child: any) => {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(child);
  };

  data.forEach((item) => {
    const { team_name, players, manager, game, team_image, team_type } = item;

    let gameNode = gameMap[game.game_name]; // Check if game node already exists
    if (!gameNode) {
      gameNode = createData(
        game.game_name,
        game.game_name,
        game.game_name,
        BASE_IMAGE_PATH + game.game_image
      );
      addChild(chartData, gameNode);
      gameMap[game.game_name] = gameNode;
    }

    const teamNode = createData(team_name, game.game_name, team_type, BASE_IMAGE_PATH + team_image);
    addChild(gameNode, teamNode);

    const managerNode = createData(
      manager.username,
      team_name,
      'Manager',
      BASE_IMAGE_PATH + manager.avatar
    );
    addChild(teamNode, managerNode);

    players.forEach((player) => {
      const playerNode = createData(
        player.username,
        team_name,
        'Player',
        BASE_IMAGE_PATH + player.avatar
      );
      addChild(managerNode, playerNode);
    });
  });

  return chartData;
}
