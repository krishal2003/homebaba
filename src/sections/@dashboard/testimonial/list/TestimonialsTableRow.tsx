import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  //   Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Rating,
} from '@mui/material';
// @types
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { ITestimonial } from 'src/@types/testimonial';

// ----------------------------------------------------------------------

type Props = {
  row: ITestimonial;
  selected: boolean;
  onToggleVerification: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function TestimonialsTableRow({ row, selected, onToggleVerification, onDeleteRow }: Props) {
  const { user, description, is_verified, rating } = row;

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
      <TableRow hover selected={selected}>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={user.first_name} src={BASE_IMAGE_PATH + user.avatar} />

            <Typography variant="subtitle2" noWrap>
              {`${user.first_name} ${user.last_name}`}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{user.email}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {description}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          <Rating value={rating} readOnly size="small" />
        </TableCell>

        <TableCell align="center">
          <Label
            variant="soft"
            color={!is_verified ? 'warning' : 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {is_verified ? 'Verified' : 'Not Verified'}
          </Label>
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
            onToggleVerification();
            handleClosePopover();
          }}
        >
          <Iconify icon={!is_verified ? 'fluent-mdl2:accept' : 'mdi:multiply'} />
          {is_verified ? `Decline` : `Accept`}
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
