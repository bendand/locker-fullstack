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
import { Css } from "@mui/icons-material";
import { useState } from "react"
import { createContext } from 'react';
import { useMemo, useCallback } from "react";
import { useColorScheme } from '@mui/joy/styles';
import UserDrawer from "./components/elements/nav/UserDrawer";

const colorTheme = extendTheme({});

export const ThemeContext = createContext(null);

// 3. A small wrapper so we can access Joy’s color scheme hook
function ThemeProvider({ children }) {
  const { mode, setMode } = useColorScheme();

  const darkModeOn = mode === "dark";

  const toggleDarkMode = useCallback(() => {
    setMode(darkModeOn ? "light" : "dark");
  }, [darkModeOn, setMode]);

  const contextValue = useMemo(
    () => ({ darkModeOn, toggleDarkMode }),
    [darkModeOn, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
      <CssVarsProvider theme={colorTheme} default="light">
        <ThemeProvider>
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
        </ThemeProvider>
      </CssVarsProvider>
    );
}

export default App
