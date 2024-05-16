import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchApi } from '../commonFunction/getApiData';
import { deleteApi } from '../commonFunction/deleteApiData';
import "../components/css/LoanListTable.css";

const LoanListTable = ({allLoans, getAllData}) => {

    const [employeeNames, setEmployeeNames] = useState({});

    const [sortBy, setSortBy] = useState({
        field: 'loanName',
        order: 'asc',
        });

    const handleDelete = async (loanId) => {
    // console.log(loanId);
    const url = `http://localhost:3000/api/loan/deleteLoan/${loanId}`;
    const deleteData = await deleteApi(url);
    getAllData();
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

    const getEmployeeName = async(empId) => {
        // console.log(empId);
        const url = `http://localhost:3000/api/employees/employeeDetails/${empId}`;
        const results = await fetchApi(url);
        // console.log(results[0].empName)
        if(results && results[0] && results[0].empName)return results[0].empName;
    }

    // Fetch employee names for all loans
    const fetchEmployeeNames = async () => {
        const names = {};
        if(allLoans){
            for (const loan of allLoans) {
                const empName = await getEmployeeName(loan.empId);
                names[loan.loanId] = empName;
            }
        }
        setEmployeeNames(names);
    };

    useEffect(() => {
        fetchEmployeeNames();
        console.log("all Loans", allLoans);
    }, [allLoans]);

    const handleSort = (field) => {
        if (sortBy.field === field) {
            setSortBy({
            field,
            order: sortBy.order === 'asc' ? 'desc' : 'asc',
            });
        } else {
            setSortBy({
            field,
            order: 'asc',
            });
        }
        };


    return (
    <>
    <section>
    <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                <table className="table">
                <thead>
                    <tr style={{textAlign: "center"}}>
                    {/* <th scope="col">Loan Id </th> */}
                    <th scope="col" onClick={() => handleSort('loanName')}
                    className={sortBy.field === 'loanName' ? `sorted ${sortBy.order}` : ''}
                    >
                        Loan Name
                        {/* <span>▲</span>
                        <span>▼</span> */}
                    </th>
                    <th scope="col">Loan Description</th>
                    <th scope="col">Loan Date</th>
                    <th scope="col">Loan Amount</th>
                    <th scope="col">Loan Pending Balance</th>
                    <th scope="col">Loan Repayment Frequency</th>
                    <th scope='col'>Borrower Name</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allLoans && allLoans.length > 0 ? 
                        allLoans && allLoans.map((res) => (
                            <tr style={{ textAlign: "center"}} key={res.loanId}>
                            {/* <th scope="row">{res.loanId}</th> */}
                            <th>{res.loanName}</th>
                            <td>{res.loanDescription}</td>
                            <td>{getFormateDate(res.loanDate)}</td>
                            <td>{formatIndianCurrency(res.amount)}</td>
                            <td>{res.loanBalance ? formatIndianCurrency(res.loanBalance) : formatIndianCurrency(0)}</td>
                            <td>{res.loanRepaymentFrequency}</td>
                            {/* <td>{getEmployeeName(res.empId)}</td> */}
                            <td>{employeeNames[res.loanId]}</td>
                            <td>
                                <Link to={`/payloan/${res.loanId}`}>
                                    <button className="btn btn-primary mx-3">
                                        Pay loan
                                    </button>
                                </Link>
                                <Link>
                                <button className='btn btn-danger' onClick={()=> { handleDelete(res.loanId)}}> 
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

export default LoanListTable;