import { useState } from "react";
import Button from "../button/Button";

export default function LoginForm({ onLogin }) {
    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    });
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    // validates number password on each keystroke
    const invalidPassword = isNaN(inputValues.password);

    // function that sets new values when inputs are changed
    function handleInputChange(event) {
        const { name, value } = event.target;
        
        setInputValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // uses form data to validate password against credentials stored in json file
    function handleSubmit(formData) {
        const username = formData.get("username");
        const password = Number(formData.get("password"));

        if (!invalidPassword) {
            fetch('https://locker-api-uoib.onrender.com/credentials')
            .then(res => {
                return res.json();
            })
            .then(credentials => {
                if (credentials.username !== username || credentials.password !== password) {

                    setInvalidCredentials(true);
                    return
                }

                onAuthenticate();
            })
        }
    }

    return (
        <form action={handleSubmit} id="locker-form">
            <div>
                <h4>Sign In</h4>
            </div>
            {invalidCredentials && (
                <div>
                    <p>Your credentials are invalid</p>
                </div>
            )}
            <div className="form-input">
                <label htmlFor="username">Username: </label>
                <input
                    type="text" 
                    name="username" 
                    value={inputValues.username}
                    onChange={handleInputChange}
                    required 
                />
            </div>
            <div className="form-input">
                <label htmlFor="password">Password: </label>
                <input
                    type="password" 
                    name="password"
                    value={inputValues.password}
                    onChange={handleInputChange}
                    required 
                />
            </div>
            {invalidPassword && (
                <div>
                    <p>
                        Hint: password is a number
                    </p>
                </div>
            )}
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}