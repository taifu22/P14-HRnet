import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../validationSchema/ValidationSchema';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setNewEmployee } from '../state/user.slice';
import { useDispatch } from 'react-redux';
import InputText from './FormInputs/InputText';
import { states } from '../data/states.selectInput';
import { departement } from '../data/departement.selectInput';
import SelectInput from './FormInputs/SelectInput';
import modal from './Modal';
import ModalSuccess from './ModalSuccess';

function FormSignin(props) { 

    //variables for store the currentdata for the input startDate, and current data -18 for dateOfBirth input
    const datebirth =  new Date(Date.now()).setFullYear(new Date(Date.now()).getFullYear() - 18)
    const todayDate =  new Date(Date.now()).setFullYear(new Date(Date.now()).getFullYear())
    const [DateBirth, setDateBirth] = useState(datebirth);
    const [startDate, setStartDate] = useState(todayDate);

    //set value for the inscription's modal
    const {isShowing: isInfoShowed, toggle: toggleInfo} = modal()

    //useForm methods for validation's form (useForm use YupResolver for the validation)
    const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema), 
    });
	const { errors } = formState;

    //useDispatch for dispatch actions and store data in redux store
    const dispatch = useDispatch();

    //function for submit the form with the hook useForm
	const onSubmit = (data) => {
        //i convert the number with the date in seconds since 1970, with the format dd/mm/yyyy
        const newdateOfBirth = moment(DateBirth).format("DD-MM-YYYY");
        const newDateOfStart = moment(startDate).format("DD-MM-YYYY")
        const dataEmployee = {...data, dateOfBirth: newdateOfBirth, dateOfStart: newDateOfStart}
        //i dispatch the recovered data to the redux store
        dispatch(setNewEmployee(dataEmployee));
        toggleInfo();
	};

    useEffect(()=>{
        // console.log(datebirth);
        // console.log(typeof datebirth);
        // console.log(DateBirth);
        // console.log(typeof DateBirth);
        //console.log(states);
    },[]) 

    return (
        <div className='container-fluid bg-primary'>
            <Link to='/employeeList'><p className='p-view text-center text-light p-3'>View Current Employees</p></Link>
            <br/>
            <div className="card mx-auto" style={{maxWidth:'620px'}} >
                <article className="card-body">
                    <header className="mb-4"><h4 className="card-title text-center">Create Employee</h4></header>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <InputText register={register} error={errors.firstname} label={'First Name'} name={"firstname"} type={"text"} />
                            <InputText register={register} error={errors.lastname} label={'Last Name'} name={"lastname"} type={"text"} />
                        </div> 
                        <div className="form-row">	 
                            <div className="form-group col-md-6" >
                                <label>Date of birth</label>
                                <DatePicker 
                                    selected={DateBirth}
                                    name={"dateOfBirth"}
                                    onChange={(date) => {setDateBirth(Date.parse(date))}}
                                    className={"form-control"}
                                    value={DateBirth}
                                    dateFormat={"dd/MM/yyyy"}
                                    showYearDropdown
                                    //yearDropdownItemNumber={20}
                                   //{...register("dateOfBirth")}
                                />
                                <small className="text-danger">
                                    {errors.dateOfBirth?.message}	
                                </small>
                            </div>
                            <div className="form-group col-md-6" >
                                <label>Start Date</label>
                                <DatePicker 
                                    className="form-control"
                                    dateFormat="dd-MM-yyyy"
                                    name="dateOfStart"
                                    selected={startDate}
                                    showYearDropdown
                                    //yearDropdownItemNumber={20}
                                    onChange={(date) => setStartDate(Date.parse(date))}
                                    //{...register("dateOfStart")}
                                    innerRef={register}
                                />
                                <small className="text-danger">
                                    {errors.dateOfStart?.message}
                                </small>
                            </div>
                        </div>
                        <div className='card mx-auto'>
                            <div className='card-body bg-light'>
                                <header className="mb-4"><h5 className="card-title text-center">Address</h5></header>
                                <div className="form-row">	 
                                    <InputText register={register} error={errors.street} label={'Street'} name={"street"} type={"text"} />
                                    <InputText register={register} error={errors.city} label={'City'} name={"city"} type={"text"} />
                                </div>
                                <div className="form-row">	 
                                    <SelectInput name={"state"} register={register} options={states} label={'State'}/>
                                    <InputText register={register} error={errors.zipCode} label={'Zip Code'} name={"zipCode"} type={"text"} />
                                </div>
                            </div>
                        </div>
                            <div className='form-row mt-2'>
                                <SelectInput name={"departement"} register={register} options={departement} label={'Departement'}/>
                            </div>
                        <div className='text-center'>
                            <button type="submit" className={`col-md-4 btn btn-primary`} >Register</button>
                        </div>          
                    </form>
                </article>
            </div>
            { isInfoShowed && <ModalSuccess hide={ toggleInfo }/> }
        </div>
    );
}

export default FormSignin;