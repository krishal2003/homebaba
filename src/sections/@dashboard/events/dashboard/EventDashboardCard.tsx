// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Card, Typography, CardProps, Link } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
// theme
import { ColorSchema } from '../../../../theme/palette';
// components

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  path: string;
  color?: ColorSchema;
}

export default function EventDashboardCard({
  title,
  path,
  color = 'primary',
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: theme.palette[color].darker,
        bgcolor: theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Link href={path} underline="none">
        <Typography variant="h3" sx={{ opacity: 0.64 }}>
          {title}
        </Typography>
      </Link>
    </Card>
  );
}
