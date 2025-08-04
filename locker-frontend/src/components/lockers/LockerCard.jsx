import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


export default function LockerCard({ locker, onClick }) {
    // uses a card component from Material UI formatted, added to and subtracted from to fit my needs
    // future enhancements of my app include making this component more modular
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 320,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
            onClick={onClick}
        >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                    src="/george-pagan-iii.jpg"
                    loading="lazy"
                    alt="geometric industrial pattern"
                />
            </AspectRatio>
            <CardContent>
                <Typography level="title-lg" id="card-description">
                    {locker.name}
                </Typography>
                <Typography
                    level="body-sm"
                    aria-describedby="card-description"
                    sx={{ mb: 1 }}
                >
                    <Link
                        overlay
                        underline="none"
                        href="#interactive-card"
                        sx={{ color: 'text.tertiary' }}
                    >
                        {locker.address}
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
}
