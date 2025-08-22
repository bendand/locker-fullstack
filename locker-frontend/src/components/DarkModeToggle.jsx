import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import React, { useState, useEffect } from 'react';

export default function DarkModeToggle({ onChange, checked }) {

    return (
        <Typography 
            component="label" 
            endDecorator={<Switch 
                            slotProps={{
                                track: {
                                    children: (
                                        <React.Fragment>
                                            <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                                                On
                                            </Typography>
                                            <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                                                Off
                                            </Typography>
                                        </React.Fragment>
                                    ),
                                },
                            }}
                            sx={{
                                '--Switch-thumbSize': '27px',
                                '--Switch-trackWidth': '64px',
                                '--Switch-trackHeight': '31px',
                            }}
                            onChange={onChange}
                            checked={checked}
                        />}
        >
            Dark
        </Typography>
    );
}