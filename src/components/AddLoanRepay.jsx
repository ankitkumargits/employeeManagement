import React, { useEffect, useState } from 'react'
import { AddApiData } from '../commonFunction/AddApiData';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../commonFunction/getApiData';

const AddLoanRepay = () => {

    const [formData, setFormData] = useState({
        // repaymentId: "",
        loanId: "",
        // repayDate: "",
        repayDate: getCurrentDate(),
        empId: "",
        amount: ""
        });

    const { loanId } = useParams();
    
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

        const fetchPayLoanData = async() => {
            try {
                const url = `http://localhost:3000/api/loan/payloan/${loanId}`;
                if(loanId){
                    const results = await fetchApi(url);
                    // console.log(results[0]);
                    setFormData({
                        loanId: results[0].loanId,
                        empId: results[0].empId,
                        repayDate: getCurrentDate()
                    });
                    setIsInputDisabled(true)
                }
            }
            catch (err){
                console.log(err);
            }
        }


        useEffect(()=> {
            fetchPayLoanData();
        }, [loanId]);
    
    const [message, setMessage] = useState("");    
        
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
        }
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log("formData",formData);
        if(formData.loanId === "" || formData.repayDate === "" || formData.empId === "" || formData.amount === ""){
            setMessage("Please fill this form");
        }else if(isNaN(formData.loanId) || isNaN(formData.empId) || isNaN(formData.amount)){
            setMessage("Loan Id or Amount or or Employee Id must be a number");
        }else {
        const apiUrl = "http://localhost:3000/api/loanrepay/addloanrepay";
        fetchApiData(apiUrl, formData);
        }
    }

        const fetchApiData = async(apiUrl, formData) => {
            try {
                // const response = await fetch(apiUrl, {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json"},
                //     body: JSON.stringify(formData)
                // });
        
                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
                
                // const data = await response.json();
                // console.log(data);

                const data = await AddApiData(apiUrl, formData);
                // console.log(data);
                if(data && data.message){
                    setMessage(data.message);
                } 
                // else if(data && data.error === "Duplicate entry: repayment ID already exists"){
                //     setMessage("Duplicate entry: repayment ID already exists")
                // } else if (data && data.error === "Internal server error" ){
                //     setMessage("Internal server error");
                // }
            }
            catch(err){
                console.log(err);
            }
            
        };

    return (
        <>
        <div style={{ textAlign: "center"}}>
            <h1>Add loan Repay</h1>
            <h4 style={{color: "red"}}>
                {message}
            </h4>
        </div>
        <div className="container">
        <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        {/* <label htmlFor="repaymentId" className="form-label">Repayment Id</label>
                        <input type="text" className="form-control" id="repaymentId" name='repaymentId' aria-describedby="repaymentId" value={formData.repaymentId} onChange={handleChange}/> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loanId" className="form-label">Loan Id</label>
                        <input type="text" className="form-control" id="loanId" name='loanId' 
                        value={formData.loanId} 
                        onChange={handleChange}
                        disabled={isInputDisabled}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repayDate" className="form-label">Repay Date</label>
                        <input type="date" className="form-control" id="repayDate" name='repayDate' aria-describedby="repayDate" value={formData.repayDate} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="empId" className="form-label">Employee Id</label>
                        <input type="text" className="form-control" id="empId" name='empId' value={formData.empId} onChange={handleChange} disabled={isInputDisabled}/>
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Repay Amount</label>
                        <input type="text" className="form-control" id="amount" name='amount' aria-describedby="amount" value={formData.amount} onChange={handleChange}/>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Repay Amount</label>
                        <div className="input-group mb-3">
                        <span className="input-group-text">₹</span>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" name="amount" id='amount' value={formData.amount} onChange={handleChange} />
                        <span className="input-group-text">.00</span>
                    </div>
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                    </div>
                </form>
        </div>
        <div className="col-md-4"></div>
        </div>
    </div>
        </>
    )
}

export default AddLoanRepay