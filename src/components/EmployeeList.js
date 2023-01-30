import React, { useState } from 'react';
import Inputsearch from './FormInputs/Inputsearch';
import Pagination from './Pagination';
import { returnProductsArrays } from './services/ServicesListEmployees';

function EmployeeList(props) {

    //useState for store the select number of line to view the list of employes on page (managed by component Pagination)
    // you can have 10 line (employe) each page or 5 or 15
    const [stateValuePage, setStateValuePage] = useState(props.valueSelect1);

    let newdataEmployees;

    //condition for return either filteredusers (if you have search with input), or the complete list of users
    if (props.dataEmployees.filteredusers.length > 0) {
        //here we return a newdata users with the pagination with 9, or 10 or 15 line (employee), if the input search is active
        newdataEmployees = returnProductsArrays(props.dataEmployees.filteredusers, stateValuePage); 
    } else {
        //if the user search input is not active we return the complete list of users with pagination
        newdataEmployees = returnProductsArrays(props.dataEmployees.users, stateValuePage); 
    }

    return (
        <div className='div-employeeList'>
            <div className='div-search'>
                <div className='div-select'>
                    <p>Show </p>
                    <select onChange={e => {setStateValuePage(e.target.value);props.updatePage(e, 0)}} id="country" name="country">
                        <option value={props.valueSelect1} >{props.valueSelect1}</option>
                        <option value={props.valueSelect2} >{props.valueSelect2}</option>
                        <option value={props.valueSelect3}>{props.valueSelect3}</option>
                    </select>
                    <p>entries</p>
                </div>
                <p onClick={()=> props.changePage()} className='p-go-home' role={'button'}><b>Go To Home</b></p>
                <Inputsearch 
                    updatePage={props.updatePage} 
                    data={props.dataEmployees} 
                    dataEmployeesFiltered={props.dataEmployeesFiltered}    
                />
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
                            newdataEmployees[0].length  ? newdataEmployees[props.dataEmployees.pageIndex].map((item, index) => {
                                return (
                                    <tr key={'key'+index}>
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
                <Pagination 
                    pageIndex={props.dataEmployees.pageIndex} 
                    users={props.dataEmployees.users} 
                    filteredusers={props.dataEmployees.filteredusers} 
                    updatePage={props.updatePage} 
                    stateValuePageSelect={stateValuePage}
                />
            </div>
        </div>
    );
}

export default EmployeeList;