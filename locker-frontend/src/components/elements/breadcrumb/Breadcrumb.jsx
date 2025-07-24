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
                "--Breadcrumbs-gap": "10px"
            }}
        >
            <Link color="neutral" href="#separators">
                Lockers
            </Link>
            <Link color="neutral" href="#separators">
                Containers
            </Link>
            <Link color="neutral" href="#separators">
                Items
            </Link>
            <br />
        </Breadcrumbs>
    );
}