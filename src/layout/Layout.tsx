import DataTable from "../components/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faGauge } from "@fortawesome/free-solid-svg-icons";

const Layout = (): JSX.Element => {
  return (
    <>
      <div className="grid min-h-screen min-w-full grid-cols-6 grid-rows-5">
        <header className="col-start-1 col-end-7 text-3xl font-bold bg-white h-16 sticky top-0"></header>
        <nav className="row-start-1 row-end-6 bg-blue-600 flex flex-col items-left fixed h-full w-52 z-50">
          <img src="./src/assets/images/logo.png" alt="" className="h-20 m-4" />
          <a href="#" className="py-8 ml-6">
            <FontAwesomeIcon
              icon={faGauge}
              className="text-xl text-white mr-2"
            />
            Dashboard
          </a>
          <a href="#" className="ml-6">
            <FontAwesomeIcon
              icon={faIdCard}
              className="text-xl text-white mr-2"
            />
            Licenses
          </a>
        </nav>
        <section className="row-start-2 row-end-5 col-start-2 col-end-7 sticky top-20">
          <DataTable />
        </section>
        <div className="row-start-5 row-end-6 col-start-2 col-end-7 h-8">
          <footer className="flex justify-center content-end">
            <p className="text-black mt-32 text-xs">
              Copyright &copy; 2024 SEQUAL S.A.S
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
