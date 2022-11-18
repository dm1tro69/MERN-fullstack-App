import React, {useEffect, useReducer} from 'react';
import './Input.css'
import {validate} from "../../../Utils/validators";

const inputReducer = (state, action) => {
   switch (action.type) {
       case 'CHANGE':
           return {...state, value: action.payload, isValid: validate(action.payload, action.validators)}
       case 'TOUCH':
           return {...state, isTouched: true}
       default:
           return state
   }
}

const Input = ({element, valid, value, id, label, type, placeholder, validators, onInput, onChange, errorText}) => {

  const [inputState, dispatch] = useReducer(inputReducer, {value: value || '', isValid: valid || false, isTouched: false})

    const changeHandler = (e) => {
        dispatch({type: 'CHANGE', payload: e.target.value, validators: validators})
    }

    const touchHandler = () => {
        dispatch({type: 'TOUCH'})
    }

    useEffect(()=> {
        onInput(id, inputState.value, inputState.isValid)
    }, [inputState.isValid, inputState.value, id])

    const elements = element === 'input'? <input
        id={id}
        value={inputState.value}
        onChange={changeHandler}
        type={type}
        placeholder={placeholder}
        onBlur={touchHandler}
        />:
        <textarea
            id={id}
            value={inputState.value}
            rows={3}
            onBlur={touchHandler}
            onChange={changeHandler}/>

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            {elements}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    );
};

export default Input;
