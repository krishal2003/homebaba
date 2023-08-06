import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Card, Table, TableBody, Container, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IFreePlayer } from '../../../@types/user';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
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
import {
  FreePlayerTableRow,
  FreePlayerTableToolbar,
  RequestedPlayerTableRow,
} from 'src/sections/freePlayers/list';
import { Request } from 'src/@types/freePlayer';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'username', label: 'Gamer Tag', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: '' },
];
const REQUEST_TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'remarks', label: 'Remarks', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
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
    selected,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState<IFreePlayer[]>([]);
  const [requestedPlayers, setRequestedPlayers] = useState<Request[]>([]);

  const [filterName, setFilterName] = useState('');

  const getAllUsers = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/all-players');
      setTableData(response.data.free_players);
      setRequestedPlayers(response.data.player_requests);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '';

  const isNotFound = !dataFiltered.length && !!filterName;

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleRequest = (id: number) => {
    axiosInstance2
      .post(`/request-player/?id=${id}`)
      .then((res) => {
        enqueueSnackbar(res.data.success, { variant: 'success' });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Requesting', { variant: 'error' });
      });
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  return (
    <>
      <Head>
        <title> User: List | Dmerce</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Free Player List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Free Player List' }]}
        />

        <Card>
          <FreePlayerTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <FreePlayerTableRow
                        key={row.id}
                        row={row}
                        // onEditRow={() => handleEditRow(row.username)}
                        onRequest={() => handleRequest(row.id)}
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
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 8 }}>
        <CustomBreadcrumbs
          heading="Requested Player List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Requested Player List' },
          ]}
        />

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={REQUEST_TABLE_HEAD}
                  rowCount={requestedPlayers.length}
                />

                <TableBody>
                  {requestedPlayers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RequestedPlayerTableRow key={row.id} row={row} />
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
}: {
  inputData: IFreePlayer[];
  comparator: (a: any, b: any) => number;
  filterName: string;
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
      (user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().indexOf(filterName.toLowerCase()) !==
        -1
    );
  }

  return inputData;
}
