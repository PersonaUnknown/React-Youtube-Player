import { useNavigate } from "react-router-dom";
const HomePage = () => {
    // Setup
    const navigate = useNavigate();
    const buttonClass = "cursor-pointer p-2 bg-black hover:bg-gray-400 text-white text-center rounded-lg";

    // Methods
    const navigateReactYT = () => {
        navigate("/react-yt");
    }
    const navigateMediaChrome = () => {
        navigate("/media-chrome");
    }
    const navigateIframe = () => {
        navigate("/iframe");
    }

    // Render
    return (
        <div className="flex flex-col mx-auto justify-center p-6 gap-3 max-w-7xl">
            <button
                type="button"
                className={buttonClass}
                onClick={navigateReactYT}
            >
                React Youtube Package
            </button>
            <button
                type="button"
                className={buttonClass}
                onClick={navigateMediaChrome}
            >
                Media Chrome
            </button>
            <button
                type="button"
                className={buttonClass}
                onClick={navigateIframe}
            >
                IFrame Embed
            </button>
        </div>
    );
}

export default HomePage;