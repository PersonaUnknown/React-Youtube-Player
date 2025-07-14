import {
	Route,
	BrowserRouter as Router,
	Routes
} from "react-router-dom";
import IFrameYoutubePlayer from "./IFrameEmbed/components/IFrameYoutubePlayer";
import MediaChromeYoutubePlayer from "./components/media-chrome/MediaChromeYoutubePlayer";
import ReactYoutubePlayer from "./ReactYoutube/components/ReactYoutubePlayer";
import ReactYoutubePlayerWrapper from "./ReactYoutube/components/ReactYoutubePlayerWrapper";
import HomePage from "./pages/HomePage";
function App() {
  // Methods
  const navigateHome = () => {
    location.pathname = "/";
  }

  // Render
  return (
    <div 
      // className="flex min-h-screen w-full justify-center"
    >
      {/* <button 
        type="button"
        className="cursor-pointer absolute top-6 left-6 bg-black hover:bg-gray-400 text-white px-4 py-2 rounded-xl"
        onClick={navigateHome}
      >
        Back Home
      </button> */}
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          <Route path="/iframe" element={<IFrameYoutubePlayer videoId="m-x101n0gh4" />} />
          <Route path="/media-chrome" element={<MediaChromeYoutubePlayer src={"https://youtu.be/m-x101n0gh4?si=n7klPSy4B0ggE2KK"} />} />
          <Route path="/react-yt" element={<ReactYoutubePlayerWrapper />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
