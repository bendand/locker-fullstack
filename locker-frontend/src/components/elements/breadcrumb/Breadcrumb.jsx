import Breadcrumbs from '@mui/joy/Breadcrumbs';

export default function Breadcrumb() {
    return (
        <Breadcrumbs 
            separator={<KeyboardArrowLeft />} 
            aria-label="breadcrumbs"
            size="lg"
        >
            <Typography>Amy</Typography>
            {['Lockers', 'Containers', 'Items'].map((string) => (
                <Link key={item} color="neutral" href="#separators">
                    {item}
                </Link>
            ))}
        </Breadcrumbs>
    );
}