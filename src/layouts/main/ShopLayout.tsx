// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
import Shop from 'src/components/Shop';
//
const ShopHeader = dynamic(() => import('./ShopHeader'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function ShopLayout({ children }: Props) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <ShopHeader />
      <Shop />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
