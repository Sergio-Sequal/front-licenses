import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Section from "../components/Section";


const Layout = (): JSX.Element => {

  return (
    <div className="grid grid-cols-6 grid-rows-none">
      <Header/>
      <NavBar/>
      <Section/>
      <Footer/>
    </div>
  );
};

export default Layout;
