import "../styles/generalForm.css";
import { useState } from "react";


function GeneralForm() {
    const [inputDisabled, setInputDisabled] = useState(false);

    function handleEdit() {
        setInputDisabled(false);
    };


    function handleError(key, value) {
        const span = document.querySelector(`.${key}-error`);
        
        let message = "";
        if (key === "first") {
            message = "First name required";
        } else if (key === "last") {
            message = "Last name required";
        } else if (key === "email") {
            if (value === "") {
                message = "Email required";
            } else {
                message = "Invalid email";
            }
        } else if (key === "phone") {
            if (value === "") {
                message = "Phone number required";
            } else {
                message = "Invalid phone number"
            }
        }

        span.textContent = message;
    };


    function clearErrors() {
        const errorSpans = document.querySelectorAll(".error");

        for (let span of errorSpans) {
            span.textContent = "";
        }
    };


    function handleSubmit(e) {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const formData = new FormData(e.target);

        let badData = false;

        for (let entry of formData.entries()) {
            const key = entry[0];
            const value = entry[1];
            if (value === "") {
                handleError(key, value);
                badData = true;
            } else if (key === "phone" && isNaN(value)) {
                handleError(key, value);
                badData = true;
            } else if (key === "email" && !emailPattern.test(value)) {
                handleError(key, value);
                badData = true;
            }
        }
        
        if (!badData) {
            clearErrors();
            setInputDisabled(true);
        }
    };

    return (
    <fieldset>
        <legend>General Information</legend>
        <form action="#" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="first" disabled={inputDisabled}>First Name</label>
            <input type="text" id="first" disabled={inputDisabled} name="first"/>
            <span className="error first-error"></span>
        </div>
        <div>
            <label htmlFor="last" disabled={inputDisabled}>Last Name</label>
            <input type="text" id="last" disabled={inputDisabled} name="last"/>
            <span className="error last-error"></span>
        </div>
        <div>
            <label htmlFor="email" disabled={inputDisabled}>Email</label>
            <input type="email" id="email" disabled={inputDisabled} name="email"/>
            <span className="error email-error"></span>
        </div>
        <div>
            <label htmlFor="phone" disabled={inputDisabled}>Phone Number</label>
            <input type="tel" id="phone" disabled={inputDisabled} name="phone"/>
            <span className="error phone-error"></span>
        </div>
        <div>
            <button onClick={handleEdit} type="button" className="edit-btn general-btn">Edit</button>
            <button type="submit" className="submit-btn general-btn">Submit</button>
        </div>
        </form>
    </fieldset>
    );
};


export default GeneralForm;