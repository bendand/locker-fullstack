import { Link as RouterLink } from "react-router-dom";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function LockerCard({ name, location, id }) {

    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 320,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                loading="lazy"
                alt=""
                />
            </AspectRatio>
            <CardContent>
                <Typography level="title-lg" id="card-description">
                    Yosemite Park
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
                        California, USA
                    </Link>
                </Typography>
                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                >
                    Cool weather all day long
                </Chip>
            </CardContent>
        </Card>
    );
}
