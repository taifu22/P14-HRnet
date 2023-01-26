import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Inputsearch from './FormInputs/Inputsearch';
import Pagination from './Pagination';
import { returnProductsArrays } from './services/ServicesListEmployees';
import { setPageIndex } from '../state/user.slice';

function EmployeeList(props) {

    const dispatch = useDispatch() 

    //useState for store the select number of line to view the list of employes on page (managed by component Pagination)
    // you can have 10 line (employe) each page or 9 or 15
    const [stateValuePage, setStateValuePage] = useState(9);
    const dataEmployees = useSelector(state => ({...state.user}));
    let newdataEmployees

    //condition for return either filteredusers (if you have search with input), or the complete list of users
    if (dataEmployees.filteredusers.length > 0) {
        //here we return a newdata users with the pagination with 9, or 10 or 15 line (employee), if the input search is active
        newdataEmployees = returnProductsArrays(dataEmployees.filteredusers, stateValuePage); 
    } else {
        //if the user search input is not active we return the complete list of users with pagination
        newdataEmployees = returnProductsArrays(dataEmployees.users, stateValuePage); 
    }

    return (
        <div className='div-employeeList'>
            <div className='div-search'>
                <div className='div-select'>
                    <p>Show </p>
                    <select onChange={e => {setStateValuePage(e.target.value);dispatch(setPageIndex(0))}} id="country" name="country">
                        <option value={9} >9</option>
                        <option value={10} >10</option>
                        <option value={15}>15</option>
                    </select>
                    <p>entries</p>
                </div>
                <Link to={'/'}><p className='p-go-home'><b>Go To Home</b></p></Link>
                <Inputsearch data={dataEmployees} />
            </div>
            <div className='div-table'>
                <table className='responsive-table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Start Date</th>
                            <th>Departement</th>
                            <th>Date of Birth</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            newdataEmployees[0].length  ? newdataEmployees[dataEmployees.pageIndex].map(item => {
                                return (
                                    <tr>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.dateOfStart}</td>
                                        <td>{item.departement}</td>
                                        <td>{item.dateOfBirth}</td>
                                        <td>{item.street}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>{item.zipCode}</td>
                                    </tr>
                                )
                            }) : 'la liste est vide' 
                        }
                    </tbody>
                </table>
            </div>
            <div className='div-pagination'>
                <Pagination stateValuePageSelect={stateValuePage}/>
            </div>
        </div>
    );
}

export default EmployeeList;