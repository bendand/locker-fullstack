import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { KeyboardArrowRight } from '@mui/icons-material';

export default function Breadcrumb({ lockersViewed, containersViewed, itemsViewed, onClickLockers }) {
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