import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../components/table';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { OrganizationTeam } from 'src/@types/organizationTeam';
import OrganizationTeamTableRow from 'src/sections/@dashboard/organization-team/list/OrganizationTeamTableRow';
import { OrganizationTeamTableToolbar } from 'src/sections/@dashboard/organization-team/list';
import { useSnackbar } from 'notistack';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Team Name', align: 'left' },
  { id: 'game_name', label: 'Game Name', align: 'left' },
  { id: 'manager', label: 'Manager', align: 'left' },
  { id: 'players', label: 'Players', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState<OrganizationTeam[]>([]);

  const [filterName, setFilterName] = useState('');

  const [GAME_OPTIONS, set_GAME_OPTIONS] = useState<{ id: number; game_name: string }[]>([]);

  const [filterGame, setfilterGame] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const getMyTeam = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/get-my-team');
      setTableData(response.data.teams);
      set_GAME_OPTIONS(response.data.games);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getMyTeam();
  }, [getMyTeam]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterGame,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterGame !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterGame) ||
    (!dataFiltered.length && !!filterStatus);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handlefilterGame = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setfilterGame(event.target.value);
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteRow = (id: string) => {
    axiosInstance2
      .delete(`/delete-team/?id=${id}`)
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Deleted', { variant: 'success' });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Deleting', { variant: 'error' });
      });
  };

  const { push } = useRouter();

  const handleEditRow = (id: string) => {
    push(PATH_DASHBOARD.organization.team.edit(paramCase(`${id}`)));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setfilterGame('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Head>
        <title> Team: List | Dmerce</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Team List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Team' }]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.organization.team.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Team
            </Button>
          }
        />

        <Card>
          <OrganizationTeamTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterGame={filterGame}
            optionsRole={GAME_OPTIONS}
            onFilterName={handleFilterName}
            onfilterGame={handlefilterGame}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <OrganizationTeamTableRow
                        key={row.id}
                        row={row}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterGame,
}: {
  inputData: OrganizationTeam[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterGame: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (team) => `${team.team_name}`.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  //   if (filterStatus !== 'all') {
  //     inputData = inputData.filter((user) => user.status === filterStatus);
  //   }

  if (filterGame !== 'all') {
    inputData = inputData.filter((team) => team.game.game_name === filterGame);
  }

  return inputData;
}
