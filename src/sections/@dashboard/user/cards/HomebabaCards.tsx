import {
  Card,
  Avatar,
  Typography,
  Divider,
  alpha,
  styled,
  Box,
  Button,
  CardActions,
} from '@mui/material';
import { IHomebabaCard,  } from 'src/@types/user';
import SvgColor from 'src/components/svg-color';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import Image from '../../../../components/image';
import Link from 'next/link';

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

type Props = {
  property: IHomebabaCard;
};

export default function HomebabaCard({ property }: Props) {
  const {
    ListingId,
    AssociationName2,
    tournament_logo,
    tournament_banner,
    StateOrProvince,
    ListPrice,
    BedroomsTotal,
    RoomsTotal,
    City,
    BathroomsTotalInteger,
    maximum_no_of_participants,
  } = property;

  return (
    <div>
      <Link
        href={`tournaments/${ListingId}`}
        key={ListingId}
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <Box>
          <Card key={ListingId} sx={{ textAlign: 'center', mb: 2, textDecoration: 'none' }}>
            <Box sx={{ position: 'relative' }}>
              <SvgColor
                src="/assets/shape_avatar.svg"
                sx={{
                  width: 144,
                  height: 62,
                  zIndex: 10,
                  left: 0,
                  right: 0,
                  bottom: -26,
                  mx: 'auto',
                  position: 'absolute',
                  color: 'background.paper',
                }}
              />

              <Avatar
                alt={AssociationName2}
                src={BASE_IMAGE_PATH + tournament_logo}
                sx={{
                  width: 64,
                  height: 64,
                  zIndex: 11,
                  left: 0,
                  right: 0,
                  bottom: -32,
                  mx: 'auto',
                  position: 'absolute',
                }}
              />

              <StyledOverlay />

              <Image
                src={BASE_IMAGE_PATH + tournament_banner}
                alt={AssociationName2}
                ratio="16/9"
              />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ mt: 3, mb: 0.5, pt: 2, textDecoration: 'none', color: 'white' }}
            >
              {AssociationName2}
            </Typography>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} sx={{ py: 1 }}>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Total Bathroom
                </Typography>
                <Typography variant="button">{BathroomsTotalInteger}</Typography>
              </div>

              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Total Rooms
                </Typography>

                <Typography variant="button">{RoomsTotal}</Typography>
              </div>

              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Total Bedrooms
                </Typography>
                <Typography variant="button">{BedroomsTotal}</Typography>
              </div>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  City
                </Typography>
                <Typography variant="button">{City}</Typography>
              </div>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Price
                </Typography>
                <Typography variant="button">$ {ListPrice}</Typography>
              </div>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  State
                </Typography>
                <Typography variant="button">{StateOrProvince}</Typography>
              </div>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardActions sx={{ display: 'flex', gap: 2 }}>
                <Link href="coming-soon">
                  <Button variant="contained" sx={{ pl: 4, pr: 4 }}>
                    Join
                  </Button>
                </Link>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Link>
    </div>
  );
}
