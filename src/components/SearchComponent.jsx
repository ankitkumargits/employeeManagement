import React, { useEffect, useState } from 'react'
import { getSearchApi } from '../commonFunction/getSearchApi';
import EmployeeList from "../components/EmployeeList";

const SearchComponent = ({url,setDomData, getAllData}) => {

    const [formData, setFormData] = useState({
        searchInput: ""
    });

    const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({...formData,[name]: value});
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // console.log("formData", formData.searchInput);
        const apiurl = url;
        if(formData.searchInput === ""){
            getAllData();
        }else {
            fetchSearchApi(apiurl);
        }
    }
    

    const fetchSearchApi = async (url) => {
        const data = await getSearchApi(url, formData);
        console.log(data);
        // setAllLoans(data.results);
        setDomData(data.results)
    }

    return (
    <>
    <div className='container'>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                    <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" value={formData.searchInput} onChange={handleChange} name='searchInput' id='searchInput'/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
        <div className="col-md-3"></div>
        </div>
        </div>
    </>
    )
}

export default SearchComponent