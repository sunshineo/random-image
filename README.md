# random-image
Random image is a Chrome extension that generate random images of 4 digits numbers and user can copy to clipboard

## Install
First clone this project
```
https://github.com/sunshineo/random-image
```
Build the plugin. I am using node v16.15.1 (npm v9.4.0). Other versions may also work.
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

## Project structure
### Backend
The `service` folder contains the code of the backend service the Chrome extension calls.

It is a [Typescript](https://www.typescriptlang.org/) project using [Express framework](https://expressjs.com/). It has just one endpoint that will return 5 images of random 4 digits numbers. We can easily add functionality to take query parameters from the request url to generate images for numbers in different range or number of images we return.

And because it is so simple right now, it could have been written with almost any language with any web framework. But using Typescript aligns with the frontend and they could in the future share models and save time/resource.

It uses a library called [text2png](https://www.npmjs.com/package/text2png) to convert the numbers to png images. So we can also support generating images for not just numbers but any text in the future.

It currently returning the images as a JSON array with base64 encoded strings as the images. This is not efficient and may not work if the images get larger. We can improve this by use `application/octet-stream` or more likely `multipart/form-data` so we can attach metadata.

I created a `Dockerfile` for the service that can be used to create a docker image for the backend service. Assuming docker is running, one can run the following to build under the `service` folder, then run.
```
docker build -t random-image-service .
docker run -it --rm -p 3000:3000 random-image-service
```
With a docker image, this service can be deployed to any major cloud provider and even a multi cloud k8s cluster.

The service currently does not have any authentication/authorization. Those are very important for a secure service, but they are tightly coupled to what identity provider will be used and what cloud provider will be used. For example if we use [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html) and put the service behind [AWS API Gateway](https://aws.amazon.com/api-gateway/), then we need to configure those services and write code for api/sdk of those services to get authentication, authorization, throttling, tracking, etc.

Besides all the things above, here are some more things probably needed for this project to go to production: ci/cd pipeline, unit tests and code coverage, stronger tslint rules, hot reload for developers to have a better development experience.

### Frontend
The `chrome-react-extension` folder contains the code of the Chrome extension.

It is a [React](https://reactjs.org/) project created by [create-react-app](https://create-react-app.dev/). It has a simple UI that list the images with copy buttons.

Again because it is very simple right now, it is possible to write it with any frontend framework or even not using a framework. But React has the potential to grow into much more complicated and sophisticated product.

The extension is currently hard coded to call `http://localhost:3000/` for the images. We can change that to a build variable, and if we get a proper ci/cd pipeline, we can take the output of the backend deployment as build variable, and have it automatically point to the correct backend.

More functionality could be added to the extension. Such as give user options to specify some parameters on how to generate the images. For example the range of the random number, how many should we return, size of the image, color choices, etc. Also we could modify the page user is viewing and provide UI for user to insert images directly to the page.

The logo, description, UI of the extension need to be polished before it can be submited to Chrome Store for approval.
