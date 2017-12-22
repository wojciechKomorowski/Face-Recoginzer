const fs = require('fs');
const cors = require('cors');
const express = require('express');
const Kairos = require('kairos-api');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const multipartMiddleware = multipart();

// API Configurations for KAIROS
let kairos_client = new Kairos('7422b369', '914f6e0bb6fac47f3fdf5c42a90735db');

// Add the route for uploading images to Kairos gallery
app.post('/upload', multipartMiddleware, function(req, res) {
    // get base64 version of image and send that to Kairos for training
    let base64image = fs.readFileSync(req.files.image.path, 'base64');
    var params = {
        image: base64image,
        subject_id: req.body.name,
        gallery_name: 'recognition',
    };
    console.log('sending to Kairos for training');
    kairos_client.enroll(params).then(function(result) {
    // return status of upload
        console.log('Image Attributes : \n' + JSON.stringify(result.body));
        return res.json(result.body);
    }).catch(function(err) { 
        // return status if upload
        return res.json({'status' : false});
    });
});

// Add the route for recognizing a person from an uploaded face
app.post('/verify', multipartMiddleware, function(req, res) {
    // get base64 version of image and send that to Kairos for recognition
    let base64image = fs.readFileSync(req.files.image.path, 'base64');
    var params = {
        image: base64image,
        gallery_name: 'recognition',
    };
    console.log('sending to Kairos for recognition');
    kairos_client.recognize(params).then(function(result) {
    // return the response
        console.log('Server responded with : \n' + JSON.stringify(result.body));
        return res.json(result.body);
    }).catch(function(err) { 
    // return status code as false
        return res.json({'status' : false});
    });  
});

app.listen(3128);
console.log('Listening on localhost:3128');