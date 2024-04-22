// import logo from "/src/assets/images/logo.png";

const Header = (): JSX.Element => {
    return (
      <header className="col-span-6 text-3xl font-bold bg-white h-14 sticky top-0 z-50 divide-y border-b border-slate-300">
        <div className="xl:hidden">
          <button className="panel-btn hamburger hamburger--spring" type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        {/* <img src={logo} alt="" className="h-12 mx-6" /> */}
      </header>
    );
  };
  
  export default Header;
  