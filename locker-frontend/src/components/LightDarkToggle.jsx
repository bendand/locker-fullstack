import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    const { mode, setMode } = useColorScheme();
    // const [ mounted, setMounted ] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) {
    //     return null;
    // }

    return (
        // <Typography 
        //     component="label" 
        //     endDecorator={<Switch 
        //                     sx={{ ml: 1 }} 
        //                     checked={darkModeOn} 
        //                     onChange={handleToggleDarkMode}
        //                 />}
        // >
        //     Dark Mode
        // </Typography>

        <Typography 
            component="label" 
            endDecorator={<Switch 
                            slotProps={{
                                track: {
                                    children: (
                                        <div>
                                            <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                                            On
                                            </Typography>
                                            <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                                            Off
                                            </Typography>
                                        </div>
                                    ),
                                },
                            }}
                            sx={{
                                '--Switch-thumbSize': '27px',
                                '--Switch-trackWidth': '64px',
                                '--Switch-trackHeight': '31px',
                            }}
                        />}
        >
            Dark
        </Typography>
    );
}