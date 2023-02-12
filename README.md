# random-image
Random image is a Chrome extension that generate random images of 4 digits numbers and user can copy to clipboard

## Install
First clone this project
```
https://github.com/sunshineo/random-image
```
Build the plugin
```
cd random-image/chrome-react-extension
npm insall
npm run build
```
Start the service
```
cd ../service
npm install
npm start
```
Install the extention. Open Chrome and enter `chrome://extensions/` in the address bar then press enter. Turn on `Developer mode` at the top right corner
![](readme-imgs/1.jpg)
Click `Load unpacked` at the top left corner
![](readme-imgs/2.jpg)
Find the folter `random-image/chrome-react-extension/build` and then click `Select`
![](readme-imgs/3.jpg)
You should then see the extension installed. Pin the extension to the task bar by click on the extensions icon then pin it.
![](readme-imgs/4.jpg)
Click the icon of the extension on the task bar and a pop up UI will show up with 5 images of random 4 digits numbers. You can click the `Copy to clipboard` button to copy the corresponding image into clipboard or click the `Refresh` button to get another set of 5 different numbers.
![](readme-imgs/5.jpg)
