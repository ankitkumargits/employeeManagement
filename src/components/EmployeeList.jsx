import React from 'react'
import { Link } from 'react-router-dom';
import { deleteApi } from '../commonFunction/deleteApiData';

const EmployeeList = (props) => {
    
    const { allEmployees, getAllData } = props;
    // console.log(allEmployees)

    const handleDeleteEmp = async (empId) => {
        // console.log(empId);
        const url = `http://localhost:3000/api/employees/deleteEmployee/${empId}`;
        const deleteData = await deleteApi(url);
        getAllData();
        // console.log(deleteData);
    }
    return (
        <>
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allEmployees && allEmployees.length > 0 ?
                        allEmployees && allEmployees.map((res) => (
                            <tr key={res.empId}>
                            <td scope="row">{res.empId}</td>
                            <td>{res.empName}</td>
                            <td>
                                <Link to={`/viewloans/${res.empId}`}>
                                    <button className="btn btn-primary mx-2">
                                    View loans
                                    </button>
                                </Link>
                                <Link to={`/addloanemp/${res.empId}`}>
                                    <button className="btn btn-primary mx-3">
                                    Take loan
                                    </button>
                                </Link>
                                <Link>
                                <button className='btn btn-danger' onClick={()=> {handleDeleteEmp(res.empId)}}>Delete</button>
                                </Link>
                            </td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={4} style={{color: "red", textAlign: "center"}}>
                            No Record Found
                        </td>
                        </tr>
                    }
                </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default EmployeeList