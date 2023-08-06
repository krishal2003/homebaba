import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
// _mock_
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
  TablePaginationCustom,
  TableHeadCustom,
} from '../../../components/table';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { useSnackbar } from 'notistack';
import { ITeam } from 'src/@types/team';
import { TeamTableRow, TeamTableToolbar } from 'src/sections/@dashboard/team';
import TeamNewEditForm from 'src/sections/@dashboard/team/TeamNewEditForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Full Name', align: 'left' },
  { id: 'post', label: 'Post', align: 'left' },
  { id: 'socials', label: 'Socials', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

TeamListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------x------------------------------------

export default function TeamListPage() {
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

  const [tableData, setTableData] = useState<ITeam[]>([]);

  const [filterName, setFilterName] = useState('');

  const getTeamList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/ourteam-list/');
      setTableData(response.data.teams);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getTeamList();
  }, [getTeamList]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '';

  const isNotFound = (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRow = (id: string) => {
    axiosInstance2
      .delete(`/delete-ourteam/?id=${id}`)
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

  const handleResetFilter = () => {
    setFilterName('');
  };

  return (
    <>
      <Head>
        <title> Our Team: List | Dmerce</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Our Team List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Our Team List' }]}
          action={
            <Button
              onClick={handleClickOpen}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new team member{' '}
            </Button>
          }
        />

        <Card>
          <TeamTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TeamTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(`${row.id}`)}
                        onDeleteRow={() => handleDeleteRow(`${row.id}`)}
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
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Team Member</DialogTitle>
        <DialogContent>
          <TeamNewEditForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: ITeam[];
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
      (team) => team.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
