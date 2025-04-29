import { useState } from "react";


function EducationFields({id}) {
    const [inputDisabled, setInputDisabled] = useState(false);
    

    function handleEdit() {
        setInputDisabled(false);
    };


    function handleError(key, value) {
        const span = document.querySelector(`.${key}-error-${id}`);
        
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
        const errorSpans = document.querySelectorAll(`.error-${id}`);

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
            if (value === "" && key !== "school-end") {
                handleError(key, value);
                badData = true;
            } 
        }

        const result = checkDates(
            formData.get("school-start"), 
            formData.get("school-end")
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
            <label htmlFor={`school-${id}`} disabled={inputDisabled}>School Name</label>
            <input type="text" id={`school-${id}`} disabled={inputDisabled} name="school"/>
            <span className={`error-${id} school-error-${id}`}></span>
        </div>
        <div>
            <label htmlFor={`study-${id}`} disabled={inputDisabled}>Field of Study</label>
            <input type="text" id={`study-${id}`} disabled={inputDisabled} name="study"/>
            <span className={`error-${id} study-error-${id}`}></span>
        </div>
        <div>
            <label htmlFor={`school-start-${id}`} disabled={inputDisabled}>Start Date</label>
            <input type="date" id={`school-start-${id}`} disabled={inputDisabled} name="school-start"/>
            <span className={`error-${id} school-start-error-${id}`}></span>
        </div>
        <div>
            <label htmlFor={`school-end-${id}`} disabled={inputDisabled}>End Date</label>
            <p disabled={inputDisabled}>(leave empty if in school)</p>
            <input type="date" id={`school-end-${id}`} disabled={inputDisabled} name="school-end"/>
            <span className={`error-${id} school-end-error-${id}`}></span>
        </div>
        <div>
            <button onClick={handleEdit} type="button" className="edit-btn general-btn">Edit</button>
            <button type="submit" className="submit-btn general-btn">Submit</button>
        </div>
        </form>
    );
};


export default EducationFields;