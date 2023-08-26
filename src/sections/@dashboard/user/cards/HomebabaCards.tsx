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
  Stack,
} from '@mui/material';
import { IHomebabaCard } from 'src/@types/user';
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
    ListingKey,
    BuildingName,
    AssociationName2,
    BusinessName,
    Media: { MediaUrl },
    tournament_banner,
    StateOrProvince,
    ListPrice,
    BedroomsTotal,
    RoomsTotal,
    City,
    BathroomsTotalInteger,
  } = property;

  return (
    <div>
      <Link
        href={`homebaba/${ListingKey}`}
        key={ListingKey}
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <Box>
          <Card key={ListingKey} sx={{ textAlign: 'center', mb: 2, textDecoration: 'none' }}>
            <Box sx={{ position: 'relative' }}>
              <SvgColor
                src="/assets/shape_avatar.svg"
                sx={{
                  width: 144,
                  height: 62,
                  left: 0,
                  right: 0,
                  bottom: -26,
                  mx: 'auto',
                  position: 'absolute',
                  color: 'background.paper',
                }}
              />

              <StyledOverlay />

              <Image src={BASE_IMAGE_PATH + MediaUrl} alt={AssociationName2} ratio="16/9" />
            </Box>
            <Typography
              variant="h3"
              textAlign="left"
              sx={{ mt: 2, ml: 1, mb: 0.5, textDecoration: 'none', color: 'primary' }}
            >
              $ {ListPrice}
            </Typography>
            <Stack textAlign="left" sx={{ pl: 2, pb: 1 }}>
              <Typography variant="h6">{BuildingName}</Typography>
              <Typography variant="h6">{BusinessName}</Typography>
              <Typography variant="h6">
                {City}, {StateOrProvince}
              </Typography>
            </Stack>
            {/* <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} sx={{ py: 1 }}>
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
            </Box> */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              
            </Box> */}
          </Card>
        </Box>
      </Link>
    </div>
  );
}
