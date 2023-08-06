import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from 'src/redux/slices/product';
// sections
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import ShopItem from 'src/layouts/main/ShopItem';
import { RootState } from 'src/redux/store';
import MainLayout from 'src/layouts/main/MainLayout';

// ----------------------------------------------------------------------

Items.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
export default function Items() {
  const {
    query: { name },
  } = useRouter();
  const dispatch = useDispatch();

  const { product, isLoading, checkout } = useSelector((state: RootState) => state.product);

  const [currentTab, setCurrentTab] = useState('description');

  useEffect(() => {
    if (name) {
      dispatch(getProduct(name as string) as any);
    }
  }, [dispatch, name]);

  return (
    <>
      <Head>
        <title>{`Shop: ${product?.name || ''} | Dmerce`}</title>
      </Head>
      <ShopItem />
    </>
  );
}
