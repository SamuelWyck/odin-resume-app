import "../styles/generalForm.css";
import { useState } from "react";
import EducationFields from "./educationFields";


function EducationForm() {
    const [fieldNumber, setFieldNumber] = useState(1);

    const fieldList = [];
    for (let i = 0; i < fieldNumber; i += 1) {
        fieldList.push(<EducationFields id={i}></EducationFields>);
    }


    function handleAdd() {
        setFieldNumber(fieldNumber + 1);
    };


    function handleSubtract() {
        if (fieldNumber > 1) {
            setFieldNumber(fieldNumber - 1);
        }
    };

    return (
    <fieldset>
        <legend>Education Information</legend>
        {fieldList}
        <div className="addition-btns">
            <button type="button" onClick={handleSubtract}>-</button>
            <button type="button" onClick={handleAdd}>+</button>
        </div>
    </fieldset>
    );
};


export default EducationForm;