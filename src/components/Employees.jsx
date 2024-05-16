import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchApi } from "../commonFunction/getApiData";
import EmployeeList from './EmployeeList';
import SearchComponent from './SearchComponent';
import Loader from "react-js-loader";
import CustomLoader from './CustomLoader';

const Employees = () => {

    const [AllEmployees, setAllEmployees] = useState([]);
    const url = "http://localhost:3000/api/employees/employeesSearch";

    const [isLoading, setIsLoading] = useState(false); // Add isLoading state

    // const fetchData = async () => {
    //     const url = "http://localhost:3000/api/employees/getallemployees";
    //     const results = await fetchApi(url);
    //     console.log(results);
    //     setAllEmployees(results);
    // }

    const fetchData = async () => {
        // setIsLoading(true); // Set isLoading to true when API call starts
        try {
            const url = "http://localhost:3000/api/employees/getallemployees";
            setIsLoading(true); // Set isLoading to true when API call starts
            const results = await fetchApi(url);
            // console.log(results);
            setIsLoading(false);
            setAllEmployees(results);

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false); // Set isLoading to false when API call ends
        }
    }


    useEffect(() => {
        try {
            fetchData();
        }catch (err){
            console.log(err);
        }
    }, [])
    

    return (
        <>
        <div>
            <h1 style={{textAlign: "center"}}>Employees Details </h1>
            <Link to="/addemp">
            <button className="btn btn-primary">Add Employee</button>
            </Link>
        </div>
        <section>
        <SearchComponent url={url} getAllData={fetchData} setDomData={setAllEmployees}/>
        </section>
        {
            isLoading  ? 
            <section>
            {/* <Loader type="spinner-circle" bgColor={"#000000"} title={"loading..."} color={'#000000'} size={50} /> */}
            <CustomLoader/>
            </section> 
            :
            <section>
                <EmployeeList allEmployees={AllEmployees} getAllData={fetchData}/>
            </section>
        }
        </>
    )
}

export default Employees