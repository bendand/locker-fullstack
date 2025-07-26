import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { KeyboardArrowLeft } from '@mui/icons-material';

export default function Breadcrumb({ lockersViewed, containersViewed, itemsViewed }) {
    return (
        <Breadcrumbs 
            // separator={<KeyboardArrowLeft />} 
            size="lg"
              sx={{
                "--Breadcrumbs-gap": "10px",
                alignContent: "center",
                justifyContent: "center"
            }}
        >
            <Link 
                color="neutral"
                disabled={lockersViewed}
            >
                Lockers
            </Link>
            <Link  
                color="neutral"
                disabled={containersViewed}
            >
                Containers
            </Link>
            <Link 
                color="neutral"
                disabled={itemsViewed}
            >
                Items
            </Link>
            <br />
        </Breadcrumbs>
    );
}