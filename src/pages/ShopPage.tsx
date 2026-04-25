import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'
import Shop from '../components/Shop';
import Footer from '../components/Footer';

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
        <Helmet>
          <title>La Bicicletería - Tienda</title>
          <meta name="description" content="Explora nuestra colección de bicicletas y accesorios." />
        </Helmet>
      <Shop />
      <Footer />
    </>
  );
};

export default ShopPage;
