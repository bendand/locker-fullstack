import Button from '@mui/joy/Button';
import { Link as RouterLink } from 'react-router';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';

import About from '../../About'; 

export default function GettingStartedNav() {
    return (
        <header>
            <Stack
                direction="row"
                spacing={3}
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <div>
                    <Link 
                        to={'/'}
                        component={RouterLink}
                        level='title-md'
                        variant='plain'
                        underline='none'
                    >
                        <h4>Locker</h4>
                    </Link>
                </div>
                <div>

                    <Link 
                        to={'/about'} 
                        component={RouterLink}
                        underline='none'
                        variant='plain'
                    >
                        About Us
                    </Link>

                </div>
            </Stack>
        </header>
        // <div class="">
        //     <nav class="border-gray-200 px-2 mb-10">
        //         <div class="mx-auto flex items-center justify-between">
        //             <a href="#" class="flex">
        //                 <svg class="h-10 mr-3" width="51" height="70" viewBox="0 0 51 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                 {/* <g clip-path="url(#clip0)">
        //                     <path d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z" fill="#76A9FA" />
        //                     <path d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z" fill="#A4CAFE" />
        //                     <path d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z" fill="#1C64F2" />
        //                 </g> */}
        //                 {/* <defs>
        //                     <clipPath id="clip0">
        //                     <rect width="51" height="70" fill="white" />
        //                     </clipPath>
        //                 </defs> */}
        //                 </svg>
        //                 <span class="self-center text-lg font-semibold whitespace-nowrap">Locker</span>
        //             </a>
        //             <div class="flex md:order-2">
        //             </div>
        //             <div class="hidden md:flex justify-between w-full md:w-auto md:order-1" id="mobile-menu-3">
        //                 <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
        //                     {/* <li>
        //                         <a href="#" class="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded" aria-current="page">Home</a>
        //                     </li> */}
        //                     {/* <li>
        //                         <a href="#" class="self-center text-lg font-semibold whitespace-nowrap">Locker</a>
        //                     </li>
        //                     <li>
        //                         <a href="#" class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">About</a>
        //                     </li> */}
        //                     {/* <li>
        //                         <a href="#" class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">Services</a>
        //                     </li> */}
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </div>

    );
};