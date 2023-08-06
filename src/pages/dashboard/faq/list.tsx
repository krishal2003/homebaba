import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Card,
  Table,
  Button,
  TableBody,
  Container,
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
import { FAQTableRow, FAQTableToolbar } from 'src/sections/@dashboard/faq';
import { IFaqs } from 'src/@types/faq';
import FAQNewEditForm from 'src/sections/@dashboard/faq/FAQNewEditForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'heading', label: 'Heading', align: 'left' },
  { id: 'detail', label: 'Detail', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

FAQListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FAQListPage() {
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

  const [tableData, setTableData] = useState<IFaqs[]>([]);

  const [filterName, setFilterName] = useState('');

  const getFAQList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/faq-list/');
      setTableData(response.data.FAQs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getFAQList();
  }, [getFAQList]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
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
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRow = (id: string) => {
    axiosInstance2
      .delete(`/delete-faq/${id}`)
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

  const [currentFAQ, setCurrentFaqs] = useState<IFaqs | undefined>(undefined);

  const handleEditRow = (row: IFaqs) => {
    setCurrentFaqs(row);
    handleClickOpenEdit();
  };

  return (
    <>
      <Head>
        <title> FAQ: List | Dmerce</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="FAQ List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'FAQ List' }]}
          action={
            <Button
              onClick={handleClickOpen}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New FAQ
            </Button>
          }
        />

        <Card>
          <FAQTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} onSort={onSort} />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <FAQTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(`${row.id}`)}
                        onEditRow={() => handleEditRow(row)}
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
        <DialogTitle>Add Faq</DialogTitle>
        <DialogContent>
          <FAQNewEditForm />
        </DialogContent>
      </Dialog>
      <Dialog fullWidth open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Faq</DialogTitle>
        <DialogContent>
          <FAQNewEditForm isEdit currentFAQ={currentFAQ} />
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
  inputData: IFaqs[];
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
      (faq) => faq.heading.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
