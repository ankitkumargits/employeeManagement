import React, { useState } from 'react'
import { AddApiData } from '../commonFunction/AddApiData';

const AddEmp = () => {

    const [form, setForm] = useState({
        // empId: "",
        empName: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form,[name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.empName === "") {
            setMessage("Please fill this form");
        }
        // else if(isNaN(form.empId)){
        //     setMessage("Employee Id must be a number");
        // }
        else {
            console.log(form)
            const apiUrl = "http://localhost:3000/api/employees/addemployee";
            fetchApiData(apiUrl, form);
        }
    };

    const fetchApiData = async(apiUrl, formData) => {
        try {
            // const response = await fetch(apiUrl, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json"},
            //     body: JSON.stringify(formData)
            // });

            // const data = await response.json();
            // console.log(data);

            const data = await AddApiData(apiUrl, formData);
            // console.log(data);
            if(data && data.message){
                setMessage(data.message);
            } 
            // else if(data && data.error === "Duplicate entry: Employee ID already exists"){
            //     setMessage("Duplicate entry: Employee ID already exists")
            // } else if (data && data.error === "Internal server error" ){
            //     setMessage("Internal server error");
            // }
            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }
        }
        catch(err){
            // console.log(err);
            throw err;
        }
    };



    return (
        <>
        <div style={{ textAlign: "center"}}>
            <h1>
                Add Employee here
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
                    {/* <div className="mb-3">
                        <label htmlFor="empId" className="form-label">Employee Id</label>
                        <input type="text" className="form-control" id="empId" name='empId' aria-describedby="empId" value={form.empId} onChange={handleChange}/>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="empName" className="form-label">Employee Name</label>
                        <input type="text" className="form-control" id="empName" name='empName' value={form.empName} onChange={handleChange}/>
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

export default AddEmp