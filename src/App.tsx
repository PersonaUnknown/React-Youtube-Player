import {
	Route,
	BrowserRouter as Router,
	Routes
} from "react-router-dom";
import IFrameYoutubePlayerWrapper from "./IFrameEmbed/components/IFrameYoutubePlayerWrapper";
import MediaChromeYoutubePlayer from "./MediaChrome/MediaChromeYoutubePlayer";
import ReactYoutubePlayerWrapper from "./ReactYoutube/components/ReactYoutubePlayerWrapper";
import HomePage from "./pages/HomePage";
function App() {
  // Render
  return (
    <div>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          <Route path="/iframe" element={<IFrameYoutubePlayerWrapper />} />
          <Route path="/media-chrome" element={<MediaChromeYoutubePlayer src={"https://youtu.be/m-x101n0gh4?si=n7klPSy4B0ggE2KK"} />} />
          <Route path="/react-yt" element={<ReactYoutubePlayerWrapper />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
