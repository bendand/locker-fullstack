import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { KeyboardArrowLeft } from '@mui/icons-material';

export default function Breadcrumb() {
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
            <Link color="neutral">
                Lockers
            </Link>
            <Link color="neutral">
                Containers
            </Link>
            <Link color="neutral">
                Items
            </Link>
            <br />
        </Breadcrumbs>
    );
}