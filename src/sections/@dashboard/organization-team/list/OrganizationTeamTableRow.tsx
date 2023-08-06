import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { OrganizationTeam } from 'src/@types/organizationTeam';

// ----------------------------------------------------------------------

type Props = {
  row: OrganizationTeam;
  onDeleteRow: VoidFunction;
  onEditRow: (id: string) => void;
};

export default function OrganizationTeamTableRow({ row, onDeleteRow, onEditRow }: Props) {
  const { game, id, manager, players, team_image, team_name, team_type } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={team_name} src={BASE_IMAGE_PATH + team_image} />
            <Stack>
              <Typography variant="subtitle2" noWrap>
                {team_name}
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {team_type}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={game.game_name} src={BASE_IMAGE_PATH + game.game_image} />
            <Stack>
              <Typography variant="subtitle2" noWrap>
                {game.game_name}
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {game.game_type}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={manager.first_name} src={BASE_IMAGE_PATH + manager.avatar} />
            <Typography variant="subtitle2" noWrap>
              {manager.first_name} {manager.last_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          <Box
            sx={{
              gap: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {players.map((player) => (
              <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 1 }}>
                <Avatar
                  alt={`${player.first_name} ${player.last_name}`}
                  src={BASE_IMAGE_PATH + player.avatar}
                />
                <Typography variant="subtitle2" noWrap>
                  {`${player.first_name} ${player.last_name}`}
                </Typography>
              </Stack>
            ))}
          </Box>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow(`${row.id}`);
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
