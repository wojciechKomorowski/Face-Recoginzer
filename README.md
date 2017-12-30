# Face-Recognizer

Simple face recognition app. Created using Kairos API, Node.js, ReactJS and React-Bootstrap.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

Use git clone in console to clone repository to your current location:

```
git -clone https://github.com/wojciechKomorowski/Face-Recognizer.git
```

### Installing

Install [node.js](https://nodejs.org/en/) environment.

For easy monitoring and restarting the server install [nodemon](https://nodemon.io/) globally.

```
npm install -g nodemon
```

After cloning repository just type in console:

```
npm install
```

All packages from package.json dependencies should be installed in node_modules.

```
"dependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "body-parser": "^1.18.2",
    "connect-multiparty": "^2.1.0",
    "cors": "^2.8.4",
    "express": "^4.16.2",
    "fs": "0.0.1-security",
    "kairos-api": "^0.1.3",
    "react": "^15.4.0",
    "react-bootstrap": "^0.31.5",
    "react-dom": "^15.4.0",
    "webpack": "^3.6.0"
  },

```

To use modules you need to run webpack through console in your project location:

```
node_modules/.bin/webpack
```

If you installed webpack globally, you can type:

```
webpack
```

Open new tab in console to run node server:

```
nodemon
```

Now your server is hosted on localhost:3128.

## Built With

* HTML5
* CSS
* ReactJs
* React-Bootstrap
* Node.js
* Express
* Webpack

## Author

* **Wojciech Komorowski** - [wojciechKomorowski](https://github.com/wojciechKomorowski)

## License

This project is licensed under the MIT [License](https://github.com/wojciechKomorowski/Face-Recognizer/blob/master/LICENSE.md).

## Acknowledgments

* [Kairos](https://www.kairos.com/)
* Inspiration: Project by [Oreoluwa Ogundipe](https://scotch.io/tutorials/building-a-simple-face-recognition-app-with-vuejs-and-kairos)