import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { KeyboardArrowLeft } from '@mui/icons-material';

export default function Breadcrumb() {
    return (
        <Breadcrumbs 
            separator={<KeyboardArrowLeft />} 
            aria-label="breadcrumbs"
            size="lg"
        >
            <Typography>Amy</Typography>
            {['Lockers', 'Containers', 'Items'].map((string) => (
                <Link key={string} color="neutral" href="#separators">
                    {string}
                </Link>
            ))}
        </Breadcrumbs>
    );
}