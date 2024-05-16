import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchApi } from "../commonFunction/getApiData";
import LoanRepayList from './LoanRepayList';
import SearchComponent from './SearchComponent';
import Loader from "react-js-loader";
import CustomLoader from './CustomLoader';


const LoanRepay = () => {

  const [allLoanRepay, setAllLoanRepay] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // Add isLoading state


  const apiurl = "http://localhost:3000/api/loanrepay/loanrepaySearch";

  // const fetchData = async () => {
  //   const url = "http://localhost:3000/api/loanrepay/getallloanrepay";
  //   const results = await fetchApi(url);
  //   // console.log(results);
  //   setAllLoanRepay(results);
  // }

  const fetchData = async () => {
    setIsLoading(true); // Set isLoading to true when API call starts
    try {
      const url = "http://localhost:3000/api/loanrepay/getallloanrepay";
      const results = await fetchApi(url);
      // console.log(results);
      setAllLoanRepay(results);
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
      <h1 style={{ textAlign: "center"}}>Loan Repayment Details</h1>
      <Link to="/addloanrepay">
      <button className="btn btn-primary">Add loan Repay</button>
      </Link>
    </div>
    <section>
      <SearchComponent url={apiurl} getAllData={fetchData} setDomData={setAllLoanRepay}/>
    </section>  
    {
      isLoading ? 
          <section>
            {/* <Loader type="spinner-circle" bgColor={"#000000"} title={"loading..."} color={'#000000'} size={50} /> */}
            <CustomLoader/>
        </section>
        :
        <section>
          <LoanRepayList allLoanRepay={allLoanRepay} getAllData={fetchData}/>
        </section>
    }
    </>
  )
}

export default LoanRepay