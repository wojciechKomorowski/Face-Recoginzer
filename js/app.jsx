import React from 'react';
import ReactDOM from 'react-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

document.addEventListener('DOMContentLoaded', function(){

    class RecognizerUploader extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                file: '',
                imagePreviewUrl: '',
                name: '',
                uploadStatus: '',
                uploadDisplay: this.props.uploadDisplay,
                identifyDisplay: this.props.identifyDisplay 
            };
        }

        changeName = (e) => {
            this.setState ({
                name: e.target.value 
            });
        }

        handleSubmit = (e) => {
            e.preventDefault();
            // Assemble form data
            let formData = new FormData();
            formData.append('image', this.state.file);
            formData.append('name', this.state.name);
            this.setState ({
                uploadStatus: 'Uploading image...Please be patient.'
            });
            console.log('Upload form was submitted');
            // Post to server
            fetch("users/upload", {
                mode: 'cors',
                method: "POST",
                body: formData
                }).then((res) => {
                    // Post a status message
                    if (res.ok) {
                        res.json()
                        .then(data => {
                            // Post a status message
                            if (Object.keys(data)[0] === 'Errors') {
                                this.setState ({
                                    uploadStatus: 'Sorry, ' + data.Errors[0].Message + '. Please upload another image. :)' 
                                });
                            } else {
                                this.setState ({
                                    uploadStatus: 'Image has been uploaded successfully. :)' 
                                });
                            }
                        })
                    } else {
                        this.setState ({
                            uploadStatus: 'There was an issue with the upload. Please try again.' 
                        });
                    }
            });
        }

        handleImageChange = (e) => {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                this.setState ({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(file);
        }

        render() {
            let imagePreviewUrl = this.state.imagePreviewUrl;
            let imagePreview = null;
            if (imagePreviewUrl) {
                imagePreview = <img src={imagePreviewUrl} alt="image to identify" className="preview__image"/>
            } else {
                imagePreview = <p>Please select an Image for Preview.</p>
            }
            return (
                <div className="upload">
                    <form action="" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div>
                            <label name="nameUpload">Name: </label>
                            <FormControl type="text" required onChange={this.changeName} label="nameUpload" placeholder="Name (e.g. John)" id="nameUpload"/>
                        </div>
                        <div>
                            <label name="fileUpload">File: </label>
                            <input type="file" required onChange={this.handleImageChange} label="fileUpload" className="file-upload"/>
                        </div>
                        <div>
                            <FormControl type="submit" value="Upload" className="upload__button" />
                        </div>  
                    </form>
                    <div className="preview">
                            <h3>Image preview</h3>
                            {imagePreview}
                            <p>{this.state.uploadStatus}</p>
                    </div>
                </div>
            )
        }
    }

    class RecognizerIdentifier extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                file: '',
                imagePreviewUrl: '',
                name: '',
                identifyStatus: '',
                uploadDisplay: this.props.uploadDisplay,
                identifyDisplay: this.props.identifyDisplay 
            };
        }

        handleSubmit = (e) => {
            e.preventDefault();
            // Assemble form data
            let formData = new FormData();
            formData.append('image', this.state.file);
            this.setState ({
                identifyStatus: 'Attempting to recognize you...please wait.'
            });
            console.log('Identify form was submitted');
            // Post to server.
            fetch("users/verify", {
                mode: 'cors',
                method: "POST",
                body: formData
                }).then((res) => {
                    if (res.ok) {
                        res.json()
                        .then(data => {
                            // Post a status message
                            if (Object.keys(data)[0] === 'Errors') {
                                this.setState ({
                                    identifyStatus: 'Sorry, ' + data.Errors[0].Message + '.' 
                                });
                            } else {
                                if (data.images[0].transaction.status === 'success') {
                                    this.setState ({
                                        identifyStatus: 'Hello ' + data.images[0].transaction.subject_id + '! :)' 
                                    });
                                } else {
                                    this.setState ({
                                        identifyStatus: data.images[0].transaction.message + '. Try uploading a picture first in upload section! :)' 
                                    });
                                }
                            }
                        })
                    } else {
                        this.setState ({
                            uploadStatus: 'There was an issue with the upload. Please try again.' 
                        });
                    }
                });     
        }

        handleImageChange = (e) => {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                this.setState ({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(file);
        }

        render() {
            let imagePreviewUrl = this.state.imagePreviewUrl;
            let imagePreview = null;
            if (imagePreviewUrl) {
                imagePreview = <img src={imagePreviewUrl} alt="image to identify" className="preview__image"/>
            } else {
                imagePreview = <p>Please select an Image for Preview.</p>
            }
            return (
                <div className="identify">
                    <form action="" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div>
                            <label name="fileIdentify">Upload Picture of Person to Recognise: </label>
                            <input type="file" required onChange={this.handleImageChange} name="fileIdentify" className="file-identify"/>
                        </div>
                        <div>
                            <FormControl type="submit" value="Identify" className="identify__button" />
                        </div>  
                    </form>
                    <div className="preview">
                            <h3>Image preview</h3>
                            {imagePreview}
                            <p>{this.state.identifyStatus}</p>
                    </div>
                </div>
            )
        }
    }

    class Recognizer extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                uploadDisplay: this.props.uploadDisplay,
                identifyDisplay: this.props.identifyDisplay
            };
        }

        changeUploadDisplay = () => {
            if (this.state.uploadDisplay === 'none' && this.state.identifyDisplay === 'block') {
                this.setState ({
                    uploadDisplay: 'block',
                    identifyDisplay : 'none'
                });
            }
        }

        changeIdentifyDisplay = () => {
            if (this.state.uploadDisplay === 'block' && this.state.identifyDisplay === 'none') {
                this.setState ({
                    uploadDisplay: 'none',
                    identifyDisplay : 'block'
                });
            }
        }

        render() {
            return (
                <div>
                    <div className="header">
                    <h1>Welcome in Face-Recognizer App 🙈 🙉</h1>
                    <h3>Upload an image of yourself and give <a href="https://www.kairos.com/" target="blank">Kairos AI</a> a shot to recognize you.</h3>
                    </div>
                    <div className="header__sections">
                        <Button onClick={this.changeUploadDisplay} className="sections__button">Upload</Button>
                        <Button onClick={this.changeIdentifyDisplay} className="sections__button">Identify</Button>
                    </div>
                    <div style={{display: this.state.uploadDisplay}}>
                        <RecognizerUploader />
                    </div> 
                    <div style={{display: this.state.identifyDisplay}}>
                        <RecognizerIdentifier />
                    </div>
                    <div className="footer">
                        <p>Face-Recognizer&copy;</p>                    
                        <a href="https://github.com/wojciechKomorowski" target="blank">wojciechKomorowski</a>
                    </div>   
                </div> 
            )
        }
    }

    class App extends React.Component {
        render() {
            return (
                <Recognizer uploadDisplay="block" identifyDisplay="none" />
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});