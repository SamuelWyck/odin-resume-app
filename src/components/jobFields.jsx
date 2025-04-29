import { useState } from "react";


function JobFields({id}) {
    const [inputDisabled, setInputDisabled] = useState(false);
    

    function handleEdit() {
        setInputDisabled(false);
    };


    function handleError(key, value) {
        const span = document.querySelector(`.${key}-error-${id}`);
        
        let message = "";
        if (key === "company") {
            message = "Company name required";
        } else if (key === "job-title") {
            message = "Job title required";
        } else if (key === "job-start") {
            if (value === "") {
                message = "Start date required";
            } else {
                message = "Invalid start date";
            }
        } else if (key === "job-end") {
            message = "Invalid end date";
        }

        span.textContent = message;
    };


    function clearErrors() {
        const errorSpans = document.querySelectorAll(`.error-${id}-${id}`);

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
            return ["job-start", "error"];
        }
        if (startDate >= endDate) {
            return ["job-end", "error"];
        }
        return [];
    };


    function handleSubmit(e) {
        e.preventDefault();
        if (inputDisabled) {
            return;
        }
        clearErrors();
        
        const formData = new FormData(e.target);
        
        let badData = false;
        
        for (let entry of formData.entries()) {
            console.log(entry)
            const key = entry[0];
            const value = entry[1];
            if (value === "" && key !== "job-end") {
                handleError(key, value);
                badData = true;
            } 
        }

        const result = checkDates(
            formData.get("job-start"), 
            formData.get("job-end")
        );
        if (result.length !== 0) {
            badData = true;
            handleError(result[0], result[1]);
        }
        
        if (!badData) {
            clearErrors();
            setInputDisabled(true);
        }
    };


    return (
        <form action="#" onSubmit={handleSubmit}>
        <div>
            <label htmlFor={`company-${id}`} disabled={inputDisabled}>Company Name</label>
            <input type="text" id={`company-${id}`} disabled={inputDisabled} name="company"/>
            <span className={`error-${id}-${id} company-error-${id}`}></span>
        </div>
        <div>
            <label htmlFor={`job-title-${id}`} disabled={inputDisabled}>Job Title</label>
            <input type="text" id={`job-title-${id}`} disabled={inputDisabled} name="job-title"/>
            <span className={`error-${id}-${id} job-title-error-${id}`}></span>
        </div>
        <div>
            <label htmlFor={`job-start-${id}`} disabled={inputDisabled}>Start Date</label>
            <input type="date" id={`job-start-${id}`} disabled={inputDisabled} name="job-start"/>
            <span className={`error-${id}-${id} job-start-error-${id}`}></span>
        </div>
        <div>
            <label htmlFor={`job-end-${id}`} disabled={inputDisabled}>End Date</label>
            <p disabled={inputDisabled}>(leave empty still employed)</p>
            <input type="date" id={`job-end-${id}`} disabled={inputDisabled} name="job-end"/>
            <span className={`error-${id}-${id} job-end-error-${id}`}></span>
        </div>
        <div>
            <button onClick={handleEdit} type="button" className="edit-btn general-btn">Edit</button>
            <button type="submit" className="submit-btn general-btn">Submit</button>
        </div>
        </form>
    );
};


export default JobFields;