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
// layouts
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TablePaginationCustom,
  TableHeadCustom,
} from '../../../../components/table';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { useSnackbar } from 'notistack';
import { FAQTableToolbar } from 'src/sections/@dashboard/faq';
import { useRouter } from 'next/router';
import EventSponsorsTableRow from 'src/sections/@dashboard/events/dashboard/sponsors/EventSponsorsTableRow';
import { ISponsors } from 'src/@types/event-sponsors';
import SponsorForm from 'src/sections/@dashboard/events/dashboard/sponsors/EventSponsorNewEditForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Sponsor Name', align: 'left' },
  { id: 'category', label: 'Sponsor Category', align: 'left' },
  { id: 'order', label: 'Order', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EventSponsorsPage() {
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

  const {
    query: { slug },
  } = useRouter();

  const [tableData, setTableData] = useState<ISponsors[]>([]);

  const [filterName, setFilterName] = useState('');

  const getFAQList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/get-event-sponsors/', {
        params: { slug },
      });
      setTableData(response.data.sponsors);
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getFAQList();
  }, [getFAQList, refetch]);

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
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
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
      .delete(`/delete-event-sponsor/`, {
        params: { id },
      })
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Deleted', { variant: 'success' });
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Deleting', { variant: 'error' });
      });
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  const [currentSponsor, setcurrentSponsor] = useState<ISponsors | undefined>(undefined);

  const handleEditRow = (row: ISponsors) => {
    setcurrentSponsor(row);
    handleClickOpenEdit();
  };

  return (
    <>
      <Container maxWidth={false}>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ mb: 2 }}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Sponsor
        </Button>

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
                      <EventSponsorsTableRow
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
        <DialogTitle>Add Sponsor</DialogTitle>
        <DialogContent>
          <SponsorForm setRefetch={setRefetch} refetch={refetch} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog fullWidth open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Sponsorship</DialogTitle>
        <DialogContent>
          <SponsorForm
            setRefetch={setRefetch}
            refetch={refetch}
            handleClose={handleCloseEdit}
            isEdit
            currentSponsor={currentSponsor}
          />
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
  inputData: ISponsors[];
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
      (faq) => faq.sponsor_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
