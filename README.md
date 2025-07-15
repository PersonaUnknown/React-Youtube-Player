# React YouTube Player 
## Made using React + TypeScript + Vite

This repo contains 3 custom YouTube media players made using the following methods:
- Native YouTube IFrame API
- react-youtube package
- media-chrome package

The idea was to create a basic YouTube player with custom UI controls that is styled similar to how media-chrome handles a custom media player and applying that towards the other 2 ways to embed YouTube videos in a React application.

Each media player loads the same example YouTube video with the same dimensions. The players made from the Youtube IFrame API and react-youtube package utilize a React Context that keeps track of various video data to be passed to media control components. This is done to ensure that the media control components do not require any props and allow any video UI component access to the video data.