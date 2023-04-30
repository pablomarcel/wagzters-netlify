import React from 'react';

const RegisterForm = () => {
    return (
        <form>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default RegisterForm;
