import "../styles/generalForm.css";
import { useState } from "react";


function EducationForm() {
    const [inputDisabled, setInputDisabled] = useState(false);
    
    function handleEdit() {
        setInputDisabled(false);
    };


    function handleError(key, value) {
        const span = document.querySelector(`.${key}-error`);
        
        let message = "";
        if (key === "school") {
            message = "School name required";
        } else if (key === "study") {
            message = "Study field required";
        } else if (key === "school-start") {
            if (value === "") {
                message = "Start date required";
            } else {
                message = "Invalid start date";
            }
        } else if (key === "school-end") {
            message = "Invalid end date";
        }

        span.textContent = message;
    };


    function clearErrors() {
        const errorSpans = document.querySelectorAll(".error");

        for (let span of errorSpans) {
            span.textContent = "";
        }
    };


    function checkDates(start, end) {
        if (start === "" ) {
            return [];
        }
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (startDate > Date.now()) {
            return ["school-start", "error"];
        }
        if (startDate >= endDate) {
            return ["school-end", "error"];
        }
        return [];
    };


    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        
        const formData = new FormData(e.target);
        
        let badData = false;
        
        for (let entry of formData.entries()) {
            console.log(entry)
            const key = entry[0];
            const value = entry[1];
            if (value === "" && key !== "school-end") {
                handleError(key, value);
                badData = true;
            } 
        }

        if (!badData) {
            const result = checkDates(
                formData.get("school-start"), 
                formData.get("school-end")
            );
            if (result.length !== 0) {
                badData = true;
                handleError(result[0], result[1]);
            }
        }
        
        if (!badData) {
            clearErrors();
            setInputDisabled(true);
        }
    };

    return (
    <fieldset>
        <legend>Education Information</legend>
        <form action="#" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="school" disabled={inputDisabled}>School Name</label>
            <input type="text" id="school" disabled={inputDisabled} name="school"/>
            <span className="error school-error"></span>
        </div>
        <div>
            <label htmlFor="study" disabled={inputDisabled}>Field of Study</label>
            <input type="text" id="study" disabled={inputDisabled} name="study"/>
            <span className="error study-error"></span>
        </div>
        <div>
            <label htmlFor="school-start" disabled={inputDisabled}>Start Date</label>
            <input type="date" id="school-start" disabled={inputDisabled} name="school-start"/>
            <span className="error school-start-error"></span>
        </div>
        <div>
            <label htmlFor="school-end" disabled={inputDisabled}>End Date</label>
            <p disabled={inputDisabled}>(leave empty if in school)</p>
            <input type="date" id="school-end" disabled={inputDisabled} name="school-end"/>
            <span className="error school-end-error"></span>
        </div>
        <div>
            <button onClick={handleEdit} type="button" className="edit-btn general-btn">Edit</button>
            <button type="submit" className="submit-btn general-btn">Submit</button>
        </div>
        </form>
    </fieldset>
    );
};


export default EducationForm;