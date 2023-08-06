// @mui
import {
  Stack,
  Avatar,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
// @types
import { IParticipationList } from 'src/_mock/arrays/_participants';
// components
import Label from '../../components/label';

// ----------------------------------------------------------------------

type Props = {
  row: IParticipationList;
};

export default function ParticipantTableRow({
  row,
}: Props) {
  const { name, avatarUrl, organization,  status,username } = row;

 
  return (
    <TableRow hover >

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />

            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{organization}</TableCell>
        <TableCell align="left">{username}</TableCell>



        <TableCell align="left">
          <Label
            variant="soft"
            color={(status === 'pending' && 'warning') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
        </TableCell>

      </TableRow>
  );
}
