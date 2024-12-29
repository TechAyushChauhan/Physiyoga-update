// pages/index.tsx
import Footer from './Components/footer/page';
import Navbar from './Components/navbar/page';
import FirstPage from './Pages/HomePages/FirstPage';
import SecondPage from './Pages/HomePages/SecondPage';
import Thirdpage from './Pages/HomePages/ThirdPage';
import FourthPage from './Pages/HomePages/FourthPage';
import FifthPage from './Pages/HomePages/FifthPage';
import SixthPage from './Pages/HomePages/SixthPage';

const Page: React.FC = () => {
  return (
    <><div className='bg-white'>
      <Navbar />
      </div>

      <FirstPage />
      <SecondPage />
      
      <Thirdpage />
      <FourthPage />
      <FifthPage />
      <SixthPage />
      <Footer />
    </>
  );
}

export default Page;
