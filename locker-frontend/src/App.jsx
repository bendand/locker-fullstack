import { Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';


import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';


import About from './components/About';
import Home from './components/Home';
import LockerDetails from './components/lockers/LockerDetails';
import ContainerDetails from './components/containers/ContainerDetails';
import LockerList from './components/lockers/LockerList';


function App() {
  return (
    <>
      <CssVarsProvider>
        <Routes>
          <Route index element={<Home />} />
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
