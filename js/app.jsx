import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class RecognizerHead extends React.Component {
        render() {
            return (
                <div>
                    <h1>Welcome in Face-Recognition App :)</h1>
                </div>
            )
        }
    }

    class RecognizerUpload extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                file: '',
                imagePreviewUrl: '' 
            };
        }

        handleSubmit = (e) => {
            e.preventDefault();
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
            console.log(file);
        }

        render() {
            let imagePreviewUrl = this.state.imagePreviewUrl;
            return (
                <div className="upload">
                    <h2>Upload Section</h2>
                    <div>
                        <label name="nameUpload">Name: </label>
                        <input type="text" name="nameUpload" id="nameUpload"/>
                    </div>
                    <div>
                        <label name="fileUpload">File: </label>
                        <input type="file" onChange={this.handleImageChange} name="fileUpload" id="fileUpload"/>
                    </div>
                    <div>
                        <button>Upload</button>
                    </div>  
                    <div className="preview">
                        <h3>Image previev</h3>
                        <img src={imagePreviewUrl} alt="imageToUpload" className="preview__image"/>
                    </div>
                </div>
            )
        }
    }

    class App extends React.Component {
        render() {
            return (
                <div>
                    <RecognizerHead />
                    <RecognizerUpload />
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});