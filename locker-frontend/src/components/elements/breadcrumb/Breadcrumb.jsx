import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/material/Link';
import { KeyboardArrowRight } from '@mui/icons-material';

// lockersViewed, containersViewed, and itemsViewed with bool values to change color dynamically
export default function Breadcrumb({ lockersViewed, containersViewed, itemsViewed, onClickLockers }) {
    // this component uses the breadcrumb component from Material UI
    // I wanted to give the user a visual signal of their current depth in the application
    return (
        <Breadcrumbs 
            separator='' 
            size="lg"
              sx={{
                "--Breadcrumbs-gap": "10px",
                alignContent: "center",
                justifyContent: "center"
            }}
        >
            <Link 
                color={lockersViewed ? 'gray' : 'neutral'}
                underline='none'
                onClick={onClickLockers}
            >
                Lockers
            </Link>
            <KeyboardArrowRight/>
            <Link  
                color={containersViewed ? 'gray' : 'neutral'}
                underline='none'
            >
                Containers
            </Link>
            <KeyboardArrowRight />
            <Link 
                color={itemsViewed ? 'gray' : 'neutral'}
                underline='none'
            >
                Items
            </Link>
            <br />
        </Breadcrumbs>
    );
}