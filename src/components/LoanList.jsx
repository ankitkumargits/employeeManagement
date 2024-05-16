import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { deleteApi } from '../commonFunction/deleteApiData';
import { fetchApi } from '../commonFunction/getApiData';
import LoanListTable from './LoanListTable';

const LoanList = ({allLoans, getAllData}) => {

    const { empId } = useParams();

    const [viewLoans, setViewLoans] = useState([]);

    const fetchEmpLoan = async() => {
        try {
            const url = `http://localhost:3000/api/loan/viewLoans/${empId}`;
            if(empId){
                const results = await fetchApi(url);
                // console.log(results);
                setViewLoans(results);
            }
        }
        catch (err){
            console.log(err);
        }
    }

    
    useEffect(()=> {
        fetchEmpLoan();
    }, [empId]);


    return (
        <>
        {
            empId ? 
            <section>
                <LoanListTable allLoans={viewLoans} getAllData={getAllData}/>
            </section>
            :
            <section>
                <LoanListTable allLoans={allLoans} getAllData={getAllData}/>         
            </section>
        }
        </>
    )
}

export default LoanList