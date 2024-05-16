import React from 'react'
import { Link } from 'react-router-dom';
import { deleteApi } from '../commonFunction/deleteApiData';

const LoanRepayList = (props) => {

    const allLoanRepay = props.allLoanRepay;
    // console.log(allLoanRepay);

    const handleDelete = async (loanRepayId) => {
        console.log(loanRepayId);
        const url = `http://localhost:3000/api/loanrepay/deleteLoanRepay/${loanRepayId}`;
        const deleteData = await deleteApi(url);
        props.getAllData();
        // console.log(deleteData);
    }


    const getFormateDate = (date) => {
        // console.log(date);
        const inputDate = new Date(date);
        const day = inputDate.getDate().toString().padStart(2, "0");
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const year = inputDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        // console.log(formattedDate); // Output: "04-10-2023"
        return formattedDate;
    }

    const formatIndianCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
        return formattedAmount;
    };


    return (
        <>
        <section>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                    <table className="table">
                    <thead>
                        <tr>
                        {/* <th scope="col">Repayment Id</th> */}
                        <th scope="col">Loan Id</th>
                        <th scope="col">Repay Date</th>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Repay Amount</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allLoanRepay && allLoanRepay.length > 0 ? 
                            allLoanRepay && allLoanRepay.map((res) => (
                                <tr key={res.repaymentId}>
                                {/* <th scope="row">{res.repaymentId}</th> */}
                                <td>{res.loanId}</td>
                                <td>{getFormateDate(res.repayDate)}</td>
                                <td>{res.empId}</td>
                                <td>{formatIndianCurrency(res.amount)}</td>
                                <td>
                                    <Link>
                                    <button className='btn btn-danger' onClick={()=> { handleDelete(res.repaymentId)}}> 
                                        Delete
                                    </button>
                                    </Link>
                                </td>
                                </tr>
                            ))
                            : 
                            <tr>
                                <td colSpan={6} style={{color: "red", textAlign: "center"}}>
                                    No Record Found
                                </td>
                            </tr>
                        }
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default LoanRepayList