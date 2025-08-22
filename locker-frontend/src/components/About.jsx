import { Box } from "@mui/joy";
import Footer from "./Footer";
import MainNav from "./elements/nav/MainNav";

export default function About() {

    return (
        <>
            <MainNav/>
            <Box
                component={'main'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100vh',        
                    width: '100%',
                    backgroundColor: 'background.body',
                }}                 
            >
                <div className="about-container">
                    <div className="about-page">
                        <img 
                            className="about-image" 
                            src="attic-boxes.jpg" 
                            alt="boxes in an attic" 
                        />
                        <div>
                            <p>
                                Locker was a tool created with the intention of being your brain for everything storage-related.
                                Locker can be useful to you whether you're a contractor, event planner, property manager, or someone
                                trying to store their items more thoughtfully. 
                            </p>

                            <p>
                                Locker helps you organize your items by keeping all of your storage spaces in one spot. Inside of each storage locker,
                                you can view your containers inside that locker, add more containers, and modify the contents of your container. 
                            </p>
                        </div>
                    </div>
                </div>
            </Box>
            <Footer />
        </>

    );

}