import React, { useEffect, useState } from 'react'
import { AddApiData } from '../commonFunction/AddApiData';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../commonFunction/getApiData';

const AddLoan = () => {

    const [formData, setFormData] = useState({
        // loanId: ""
        // borrowerName: "",
        loanName: "",
        loanDescription: "",
        // loanDate: "",
        loanDate: getCurrentDate(),
        amount: "",
        loanRepaymentFrequency: "",
        });

        const [borrowerName, setBorrowName] = useState("");

        let { empId } = useParams();

        const [inputIsDisabled, setInputIsDisabled] = useState(false);

        function getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
            }

    const [message, setMessage] = useState("");    
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({...formData,[name]: value});
        }
    
        const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("formData", formData);
        if(formData.loanName === "" || formData.loanDescription === "" || formData.amount === "" || formData.loanDate === "" || formData.loanRepaymentFrequency === "") {
            setMessage("Please fill this form");
        }
        else if(isNaN(formData.amount)){
            setMessage("Loan Id or Amount or Loan Repayment Frequency must be a number");
        }
        else {
        const formDataWithEmpId = { ...formData, empId, 
            // loanBalance: formData.amount
        };
    
        // console.log(formDataWithEmpId);
        const apiUrl = "http://localhost:3000/api/loan/addloan";
        fetchApiData(apiUrl, formDataWithEmpId);
        }
        }


        const fetchApiData = async(apiUrl, formData) => {
            try {
                const data = await AddApiData(apiUrl, formData);

                if(data && data.message){
                    // setMessage("Added loan");
                    setMessage(data.message);
                }
                // else if(data && data.error === "Duplicate entry: Loan ID already exists"){
                //     setMessage("Duplicate entry: Loan ID already exists")
                // } else if (data && data.error === "Internal server error" ){
                //     setMessage("Internal server error");
                // }
                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
            }
            catch(err){
                // console.log(err);
                // throw new Error(err);
            }
        };

        const getEmployeeName = async () => {
            if(empId){
                const url = `http://localhost:3000/api/employees/employeeDetails/${empId}`;
                const results = await fetchApi(url);
                // console.log(results);
                // setFormData({
                //     borrowerName: results[0].empName
                // });
                setBorrowName(results[0].empName);
                setInputIsDisabled(true);
            }
        }


        useEffect(()=> {
            getEmployeeName();
        }, [empId]);

    return (
        <>
        <div style={{ textAlign: "center"}}>
            <h1>
                Add loan here
            </h1>
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
                        <label htmlFor="borrowerName" className="form-label">Borrower Name</label>
                        <input type="text" className="form-control" id="borrowerName" name='borrowerName' aria-describedby="borrowerName" 
                        // value={formData.borrowerName} 
                        // onChange={handleChange} 
                        onChange={(e)=> { setBorrowName(e.target.value)}}
                        value={borrowerName}
                        disabled = {inputIsDisabled}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loanName" className="form-label">Loan Name</label>
                        <input type="text" className="form-control" id="loanName" name='loanName' aria-describedby="loanName" value={formData.loanName} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loanDescription" className="form-label">Loan Description</label>
                        <input type="text" className="form-control" id="loanDescription" name='loanDescription' value={formData.loanDescription} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loanDate" className="form-label">Loan Date</label>
                        <input type="date" className="form-control" id="loanDate" name='loanDate' aria-describedby="loanDate" 
                        value={formData.loanDate} 
                        onChange={handleChange} 
                        // defaultValue={getCurrentDate()}
                        />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Loan Amount</label>
                        <input type="text" className="form-control" id="amount" name='amount' aria-describedby="amount" value={formData.amount} onChange={handleChange}/>
                    </div> */}
                    {/* formatted loan amount input box */}
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Loan Amount</label>
                        <div className="input-group mb-3">
                        <span className="input-group-text">₹</span>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" name="amount" id='amount' value={formData.amount} onChange={handleChange} />
                        <span className="input-group-text">.00</span>
                    </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loanId" className="form-label">Loan Repayment Frequency</label>
                        <input type="text" className="form-control" id="loanRepaymentFrequency" name='loanRepaymentFrequency' aria-describedby="loanRepaymentFrequency" value={formData.loanRepaymentFrequency} onChange={handleChange}/>
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

export default AddLoan