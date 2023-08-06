// @mui
import { Stack, Avatar, TableRow, TableCell, Typography, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Request } from 'src/@types/freePlayer';
import { useAuthContext } from 'src/auth/useAuthContext';
// @types
// components
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';

// ----------------------------------------------------------------------

type Props = {
  row: Request;
};

export default function RequestedPlayerTableRow({ row }: Props) {
  const { id, player, remarks, request_status, request_started_by } = row;

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleAcceptRequest = (idd: number) => {
    axiosInstance2
      .post(`/accept-request/?id=${idd}`)
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Request Accepted', { variant: 'success' });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Accepting Request', { variant: 'error' });
      });
  };

  const handleRejectRequest = (idd: number) => {
    axiosInstance2
      .post(`/reject-request/?id=${idd}`)
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Request Rejected', { variant: 'success' });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Rejecting Request', { variant: 'error' });
      });
  };

  const handleDeleteRequest = (idd: number) => {
    axiosInstance2
      .delete(`/delete-request/?id=${idd}`)
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Request Deleted', { variant: 'success' });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Deleting Request', { variant: 'error' });
      });
  };

  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt={`${player.first_name} ${player.last_name}`}
            src={BASE_IMAGE_PATH + player.avatar}
          />

          <Typography variant="subtitle2" noWrap>
            {`${player.first_name} ${player.last_name}`}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">{remarks || '----'}</TableCell>

      <TableCell align="left">{player.email || '----'}</TableCell>
      <TableCell align="left">{request_status}</TableCell>
      {request_status === 'Requested' && (
        <TableCell align="right">
          {request_started_by !== user?.role ? (
            <>
              <Button size="small" color="success" onClick={() => handleAcceptRequest(id)}>
                Accept
              </Button>
              <Button size="small" color="error" onClick={() => handleRejectRequest(id)}>
                Reject
              </Button>
            </>
          ) : (
            <Button size="small" color="success" onClick={() => handleDeleteRequest(id)}>
              Cancel
            </Button>
          )}
        </TableCell>
      )}
    </TableRow>
  );
}
