import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class RecognizerHeader extends React.Component {
        render() {
            return (
                <div>
                    <h1>Welcome in Face-Recognition App :)</h1>
                </div>
            )
        }
    }

    class RecognizerUploader extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                file: '',
                imagePreviewUrl: '',
                name: '',
                uploadStatus: '' 
            };
        }

        changeName = (e) => {
            this.setState ({
                name: e.target.value 
            })
        }

        handleSubmit = (e) => {
            e.preventDefault();
            // Assemble form data
            let formData = new FormData();
            formData.append('image', this.state.file);
            formData.append('name', this.state.name);
            this.setState ({
                uploadStatus: 'Uploading image...Please be patient.'
            })
            console.log('Upload form was submitted');
            // Post to server
            fetch("http://localhost:3128/upload", {
                mode: 'cors',
                method: "POST",
                body: formData
                }).then((res) => {
                    // Post a status message
                    if (res.ok) {
                        this.setState ({
                            uploadStatus: 'Image has been uploaded successfully.' 
                        })
                    } else {
                        this.setState ({
                            uploadStatus: 'There was an issue with the upload, try again.' 
                        })
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
            return (
                <div className="upload">
                    <h2>Upload Section</h2>
                    <form action="" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div>
                            <label name="nameUpload">Name: </label>
                            <input type="text" required onChange={this.changeName} name="nameUpload" id="nameUpload"/>
                        </div>
                        <div>
                            <label name="fileUpload">File: </label>
                            <input type="file" required onChange={this.handleImageChange} name="fileUpload" className="file-upload"/>
                        </div>
                        <div>
                            <input type="submit" value="Upload" />
                        </div>  
                        <div className="preview">
                            <h3>Image previev</h3>
                            <img src={imagePreviewUrl} alt="image to upload" className="preview__image"/>
                            <p>{this.state.uploadStatus}</p>
                        </div>
                    </form>
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
                identifyStatus: '' 
            };
        }

        handleSubmit = (e) => {
            e.preventDefault();
            // Assemble form data
            let formData = new FormData();
            formData.append('image', this.state.file);
            this.setState ({
                identifyStatus: 'Attempting to recognize you...please wait.'
            })
            console.log('Identify form was submitted');
            // Post to server
            fetch("http://localhost:3128/verify", {
                mode: 'cors',
                method: "POST",
                body: formData
                }).then((res) => {
                    console.log(res.json);
                    // Post a status message
                    if (res.ok) {
                        this.setState ({
                            uploadStatus: 'What\'s good ' + '!' 
                        })
                    } else {
                        this.setState ({
                            uploadStatus: 'Don\'t know who you are! Try uploading a picture first in upload section.' 
                        })
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
            return (
                <div className="identify">
                    <h2>Identify Section</h2>
                    <form action="" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div>
                            <label name="fileIdentify">Upload Picture of Person to Recognise: </label>
                            <input type="file" required onChange={this.handleImageChange} name="fileIdentify" className="file-identify"/>
                        </div>
                        <div>
                            <input type="submit" value="Identify" />
                        </div>  
                        <div className="preview">
                            <h3>Image previev</h3>
                            <img src={imagePreviewUrl} alt="image to identify" className="preview__image"/>
                            <p>{this.state.identifyStatus}</p>
                        </div>
                    </form>
                </div>
            )
        }
    }

    class App extends React.Component {
        render() {
            return (
                <div>
                    <RecognizerHeader />
                    <RecognizerUploader />
                    <RecognizerIdentifier />
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});