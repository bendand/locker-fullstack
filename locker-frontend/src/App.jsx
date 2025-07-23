import { Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { CssVarsProvider } from '@mui/joy/styles';
import About from './components/About';
import LockerDetails from './components/lockers/LockerDetails';
import ContainerDetails from './components/containers/ContainerDetails';
import LockerList from './components/lockers/LockerList';
import GettingStarted from "./components/GettingStarted";


function App() {
  return (
    <>
      <CssVarsProvider>
        <Routes>
          <Route index element={<GettingStarted />} />
          <Route path="about" element={<About />} />
          <Route path="lockerlist" element={<LockerList />} />
          <Route path="lockerlist/:lockerId" element={<LockerDetails />} />
          <Route path="lockerlist/:lockerId/:containerName" element={<ContainerDetails />} />
        </Routes> 
        <ToastContainer />
      </CssVarsProvider>
    </>
    );

}

export default App
