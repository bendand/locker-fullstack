import { useState } from "react";

// custom hook that takes a value and validates it against 
// any set of functions that are given as arguments
export function useInput(defaultValue, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true)
    }

    return {
        value: enteredValue, 
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid,
    }
}