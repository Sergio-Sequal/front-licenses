
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routes/AppRouter";
const App = (): JSX.Element => {


  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  );
};

export default App;
