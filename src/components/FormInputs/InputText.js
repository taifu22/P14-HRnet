import React from 'react';
import { registerLocale } from 'react-datepicker';

function InputText(props) {
    return (
        <div className="col form-group col-md-6" >
            <label for={props.name}>{props.label}</label> 
            <input {...props.register(props.name)} type={props.type} name={props.name} className="form-control"  />
            <small className="text-danger">
                {props.error?.message}	 
            </small>
        </div>
    );
}

export default InputText; 