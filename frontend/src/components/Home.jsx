import Buttons from "./subcomponents/Buttons";
import Footer from "./Footer";

const Home = () => {
 

    return (
        <>
            <section className="hero-section text-center w-full h-full flex justify-center items-center p-5">
                <div className="max-w-[600px] mx-auto">
                    <h1 className="my-5 mx-auto font-bold text-6xl leading-tight">Elevate Your Sports Experience</h1>
                    <p className="p-5 mb-5 text-center">Fuel Your Passion, Connect with Play
                        Discover nearby sports activities and find your perfect team. Join us to elevate your sports journey.</p>
                    <div>
                        <Buttons text={"Get Started for Free"} />
                    </div>
                </div>

            </section>
            <Footer />
        </>
    );
}

export default Home;
