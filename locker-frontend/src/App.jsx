import { Routes, Route} from "react-router-dom";
import { useState, createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { CssVarsProvider } from '@mui/joy/styles';
import About from './components/About';
import LockerDetails from './components/lockers/LockerDetails';
import ContainerDetails from './components/containers/ContainerDetails';
import LockerList from './components/lockers/LockerList';
import GettingStarted from "./components/GettingStarted";
import Feedback from "./components/elements/form/Feedback"

export const AuthContext = createContext(null);

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <>
      <CssVarsProvider>
        <AuthContext.Provider value={{ userId, setUserId }}>
          <Routes>
            {!userId && (
              <Route path="/" element={<GettingStarted />} />
            )}
            {userId && (
              <Route path="/" element={<LockerList />} />
            )}
            <Route path="about" element={<About />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="lockerlist" element={<LockerList />} />
            <Route path="lockerlist/:lockerId/:lockerName" element={<LockerDetails />} />
            <Route path="lockerlist/:lockerId/:lockerName/:containerId/:containerName" element={<ContainerDetails />} />
          </Routes> 
          <ToastContainer />
        </AuthContext.Provider>
      </CssVarsProvider>
    </>
    );

}

export default App
