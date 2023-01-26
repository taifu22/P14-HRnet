import React, { useState } from 'react';

function SelectInput(props) { 

    const [selected, setSelected] = useState(props.options[0].name);

    return (
        <div className='col form-group col-md-6'>
            <label>{props.label}</label>
            <select {...props.register(props.name)} name={props.name} value={selected} className="form-control" onChange={(e) => setSelected(e.target.value.name)}>
                {props.options.map((value) => (
                <option value={value.name} key={value.name}>
                    {value.name}
                </option>
                ))} 
            </select>
        </div>
    );
}

export default SelectInput;