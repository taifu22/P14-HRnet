import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setPageIndex } from '../state/user.slice';
import { returnProductsArrays } from './services/ServicesListEmployees';

const Pagination = (props) => {

	const dispatch = useDispatch() 

	/*here we retrieve the list of employees in order to be able to return an array sorted in relation
	to the number of rows we want per page*/ 
	const { users, filteredusers, pageIndex } = useSelector(state => ({ ...state.user }));
    let newData;
	if (filteredusers.length > 0) {
		//if the search users input is actived, the newdata contains the value of search data
		newData = returnProductsArrays(filteredusers, props.stateValuePageSelect);
	} else {
		newData = returnProductsArrays(users, props.stateValuePageSelect);  
	}

	//here we dispatch to store the pageindex where we are in pagination
	const updatePage = (event, index) => {
		event.preventDefault()
		dispatch(setPageIndex(index))
	}

	//if we are in first page the balise li Previsous is disabled, and if we are in last page the Next <li> are disabled
	const Previous = React.useMemo(() => { 
		return { isDisabled: pageIndex === 0 }
	}, [pageIndex])
	const Next = React.useMemo(() => {  
		return { isDisabled: pageIndex === newData.length - 1  }
	}, [pageIndex])
		 
    return ( 
		!!newData.length &&
		<nav aria-label="Page navigation example" >
			<ul className="pagination">
				<li className={`page-item ${ Previous.isDisabled ? 'disabled' : ''}`}>
				    <a className="page-link" href="#" onClick={(e) => updatePage(e, pageIndex - 1)}>Previous</a>
				</li>
					{newData.map((_, index) => {
					    return (<li key={index} className="page-item">
						            <a className="page-link" onClick={(e) => updatePage(e, index)}>{ index + 1 }</a>
								</li>
								)}
					)}						
				<li className={`page-item ${ Next.isDisabled ? 'disabled' : ''}`}>
				    <a className="page-link" href="#" onClick={(e) => updatePage(e, pageIndex + 1)}>Next</a>
				</li>
			</ul>
		</nav>)
}
export default Pagination 