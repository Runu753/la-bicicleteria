import { useEffect } from 'react';
import Shop from '../components/Shop';
import Footer from '../components/Footer';

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Shop />
      <Footer />
    </>
  );
};

export default ShopPage;
