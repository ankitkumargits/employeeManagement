import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchApi } from "../commonFunction/getApiData";
import LoanList from './LoanList';
import SearchComponent from './SearchComponent';
import Loader from "react-js-loader";
import CustomLoader from './CustomLoader';


const Loan = () => {

    const [allLoans, setAllLoans] = useState([]);

    const [isLoading, setIsLoading] = useState(false); // Add isLoading state


    const url = "http://localhost:3000/api/loan/loansearch";

    // const fetchData = async () => {
    //     const url = "http://localhost:3000/api/loan/getallloans";
    //     const results = await fetchApi(url);
    //     // console.log(results);
    //     setAllLoans(results)
    // }

    const fetchData = async () => {
        setIsLoading(true); // Set isLoading to true when API call starts
        try {
                const url = "http://localhost:3000/api/loan/getallloans";
                const results = await fetchApi(url);
                // console.log(results);
                setAllLoans(results)
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
        <h1 style={{textAlign: "center"}}>Loan Details</h1>
        <Link to="/addloan">
            <button className="btn btn-primary">Add Loan</button>
        </Link>
    </div>
    <section>
        <SearchComponent url={url} setDomData={setAllLoans} getAllData={fetchData}/>
    </section>
    {
        isLoading ? 
        <section>
            {/* <Loader type="spinner-circle" bgColor={"#000000"} title={"loading..."} color={'#000000'} size={50} /> */}
            <CustomLoader/>
        </section>
        : 
        <div>
        <LoanList allLoans={allLoans} getAllData={fetchData}/>
        </div>
    }
    </>
    )
}

export default Loan