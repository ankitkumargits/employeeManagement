const router = require('express').Router();
const connection = require("../db/conn");

router.get("/getemployees", (req, res)=> {
    connection.query("select * from employees", (err, results)=> {
        if(err){
            console.warn(err.stack);
        }else {
            res.status(200).json({ results: results})
        }
    })
});

router.post("/addemployee", (req, res)=> {
    // console.log(req.body);
    // const data = req.body
    const {empId, empName} = req.body
    const data = { 
        // empId: empId, 
        empName: empName
    }
    connection.query("insert into employees set ?", data, (err, result, fields)=> {
        if(err){
            // console.error(err.stack);
            // throw  Error(err);
            if (err.code === "ER_DUP_ENTRY") {
                    res.status(400).json({ message: "Duplicate entry: Employee ID already exists" });
                } else {
                // console.error(err.stack);
                    res.status(500).json({ message: "Internal server error" });
                }
        }else {
        // console.log(result)
        res.status(200).json({result: result, message: "Added Employee"})
        }
    })
});

router.get("/getallemployees", (req, res)=> {
    connection.query("select * from employees ORDER BY empId DESC", (err, results)=> {
        if(err){
            console.warn(err.stack);
        }else {
            res.status(200).json(results)
        }
    })
});


router.delete("/deleteEmployee/:id", (req, res)=> {
    const empId = req.params.id;
    // console.log(empId);
    connection.query(`delete from employees where empId = ${empId}` , (err, results, fields)=> {
        if(err){
            throw err;
        }
        res.status(200).json({message: 'Employees deleted successfully', results: results, deleteId: empId});
    })
});

router.post("/employeesSearch", (req, res) => {
    
    const searchCriteria  = req.body.searchInput;
    console.log(searchCriteria);

    if (!searchCriteria) {
    return res.status(400).json({ error: 'Search criteria is required.' });
    }

    const query = `SELECT * FROM employees
                    WHERE empName LIKE ?`;

    const searchTerm = `%${searchCriteria}%`;

    connection.query(query, [searchTerm], (err, results) => {
    try {
        if (err) {
            // console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error.' });
        }
    
        if (results.length === 0) {
            return res.status(404).json({ message: 'No matching employees found.' });
        }
        res.status(200).json({ results });
    }
    catch(err){
        console.log(err);
    }
    });
});

router.get("/employeeDetails/:id", (req, res) => {
    // console.log(req.body);
    try {
        const empId = req.params.id;
        // console.log(empId);
    connection.query(`SELECT * FROM employees WHERE empId = ${empId}`, (err, result)=> {
        if(err){
            console.warn("Error getting loan from database getEmployee");
        }else {
            // console.log("result [0] empName",result[0].empName)
            res.status(200).json(result)
        }
    });
    }catch (err) {
        console.log(err);
    }
})

module.exports = router;
