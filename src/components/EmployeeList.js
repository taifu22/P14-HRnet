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
    if (props.dataEmployeeFiltered.length > 0) {
        //here we return a newdata users with the pagination with 9, or 10 or 15 line (employee), if the input search is active
        newdataEmployees = returnProductsArrays(props.dataEmployeeFiltered, stateValuePage); 
    } else {
        //if the user search input is not active we return the complete list of users with pagination
        newdataEmployees = returnProductsArrays(props.dataEmployees, stateValuePage); 
    }

    //function to iterate on the object containing the values of each employee
    function forEmployee(item, index) {
        const array = []
        for(let item1 of Object.getOwnPropertyNames(item)) {
            const item2 = item[item1]
            array.push(item2)
        }
        return (
            <tr key={'tr'+index}>
                {array.map(data => {
                    return (<td key={'td'+index+data}>{data}</td>)
                })}
            </tr>
        )
    }

    //function to choose theme css
    function Themecss() {
        if (props.cssThemes == 'theme2') {
            return 'div-employeeList-dark'
        } else if (props.cssThemes == 'theme3') {
            return 'div-employeeList-danger'
        } else {
            return 'div-employeeList-white'
        }
    }

    return (
        <div className={Themecss()}>
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
                <p onClick={()=> props.changePage()} className='p-go-home' role={'button'}><b>{props.pBack}</b></p>
                <Inputsearch 
                    updatePage={props.updatePage} 
                    data={props.dataEmployees} 
                    dataEmployeesFiltered={props.setDataEmployeesFiltered}    
                />
            </div>
            <div className='div-table'>
                <table className='responsive-table'>
                    <thead>
                        <tr>
                            {props.arrayValuesTh.map((item, index) => {
                                return(
                                    <th key={'th'+index}>{item}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            newdataEmployees.length ? newdataEmployees[props.pageIndex].map((item, index) => {
                                return forEmployee(item, index)
                            }) : <p className='p-empty-list'>la liste est vide</p>
                        }
                    </tbody>
                </table>
            </div>
            <div className='div-pagination'>
                <Pagination 
                    pageIndex={props.pageIndex} 
                    users={props.dataEmployees} 
                    filteredusers={props.dataEmployeeFiltered} 
                    updatePage={props.updatePage} 
                    stateValuePageSelect={stateValuePage}
                    cssThemes={props.cssThemes}
                />
            </div>
        </div>
    );
}

export default EmployeeList;