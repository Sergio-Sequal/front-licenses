import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import InstallationTable from "../components/InstallationTable";

const SbotInstallation = (): JSX.Element => {

  return (
    <div className="grid grid-cols-6 grid-rows-none">
      <Header />
      <NavBar />
      <section className="col-start-2 col-end-7 px-6 mt-5 max-xl:col-start-1 max-xl:col-end-7 max-sm:px-2">
        <InstallationTable />
        <Footer />
      </section>
    </div>
  );
};

export default SbotInstallation;
