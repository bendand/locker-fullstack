import Navigation from "./Header";
import Footer from "./Footer";

export default function About() {
    return (
        <>
            {/* <Navigation /> */}
            <main>
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
            </main>
            <Footer />
        </>

    );

}