import { useState } from 'react';
// @mui
import { Tab, Tabs, Card, Table, Divider, TableBody, TableContainer } from '@mui/material';
// _mock_
import { IParticipationList, _participantList } from 'src/_mock/arrays/_participants';
// components
import Scrollbar from '../../components/scrollbar';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../components/table';
// sections
import ParticipantTableToolbar from './ParticipantTableToolbar';
import ParticipantTableRow from './ParticipantTableRow';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'accepted', 'pending'];

const TABLE_HEAD = [
  { id: 'name', label: 'Full Name', align: 'left' },
  { id: 'Organization', label: 'Organization', align: 'left' },
  { id: 'username', label: 'Username', align: 'left' },
  { id: 'status', label: 'Participation Status', align: 'left' },
  { id: '' },
];

function Participants() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [filterName, setFilterName] = useState('');

  const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = applyFilter({
    inputData: _participantList,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterStatus);

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus('all');
  };
  return (
    <Card>
      <Tabs
        value={filterStatus}
        onChange={handleFilterStatus}
        sx={{
          px: 2,
          bgcolor: 'background.neutral',
        }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab key={tab} label={tab} value={tab} />
        ))}
      </Tabs>

      <Divider />

      <ParticipantTableToolbar
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
              rowCount={_participantList.length}
              onSort={onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <ParticipantTableRow key={row.id} row={row} />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, _participantList.length)}
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
  );
}

export default Participants;

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
}: {
  inputData: IParticipationList[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
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
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  return inputData;
}
