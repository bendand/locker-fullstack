import { Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { CssVarsProvider } from '@mui/joy/styles';
import { extendTheme } from '@mui/joy/styles';
import About from './components/About';
import LockerDetails from './components/lockers/LockerDetails';
import ContainerDetails from './components/containers/ContainerDetails';
import LockerList from './components/lockers/LockerList';
import GettingStarted from "./components/GettingStarted";
import Feedback from "./components/elements/form/Feedback"
import UserProfile from "./components/UserProfile";
import LockerMap from "./components/LockerMap";

// const theme = extendTheme({
//   colorSchemeSelector: 'light',
// });

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<GettingStarted />} />
          <Route path="about" element={<About />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="lockermap" element={<LockerMap />} />
          <Route path="lockerlist" element={<LockerList />} />
          <Route path="lockerlist/:lockerId/:lockerName" element={<LockerDetails />} />
          <Route path="lockerlist/:lockerId/:lockerName/:containerId/:containerName" element={<ContainerDetails />} />
        </Routes> 
        <ToastContainer />
      </>
    );

}

export default App
