
import Layout from "./layout/Layout";
import Loader from "./components/Loader";



const App = (): JSX.Element => {
  

  return (
    <div>
      <Loader isActive={false}/>
      <Layout/>      
    </div>

  );
};

export default App;
