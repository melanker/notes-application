import React from 'react';

const LoginCard = ({onSubmit}) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(event);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" required={true}/>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" required={true}/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LoginCard;
