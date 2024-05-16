const router = require("express").Router();
const connection = require("../db/conn");

router.get("/getloan", (req, res)=> {
    try {
        connection.query("SELECT * FROM loan", (err, result)=> {
            if(err){
                console.warn("Error getting loan from database get loan", err);
            }else {
                res.status(200).json({success:result})
            }
        })
    }catch (err){
        console.log(err);
    }
});

router.post("/addloan", (req,res)=> {
    try {
        console.log(req.body);
    // const data = req.body;
    const { loanId, loanName, loanDescription, loanDate, amount, loanRepaymentFrequency, empId, loanBalance} = req.body;
    const data = {
        // loanId: loanId,
        loanName: loanName,
        loanDescription: loanDescription,
        loanDate: loanDate,
        amount: amount,
        loanRepaymentFrequency: loanRepaymentFrequency,
        // loanBalance: loanBalance
    }

    if (empId) {
        // console.log("empId", empId);
        // console.log("/before data",data);
        data.empId = empId;
        // console.log("after data",data);
    }
    connection.query("insert into loan set ?", data, (err, result, fields)=> {
        if(err){
            // console.error(err.stack);
            // throw  Error(err);
            if (err.code === "ER_DUP_ENTRY") {
                    res.status(400).json({ error: "Duplicate entry: Loan ID already exists" });
                } else {
                // console.error(err.stack);
                    res.status(500).json({ error: "Internal server error" });
                }
        }else {
        // console.log(result)
        res.status(200).json({result: result, message: "Added loan"})
        }
    });
    }catch (err){
        console.log(err);
    }
});

router.get("/getallloans", (req, res)=> {
    try {
        connection.query("SELECT * FROM loan ORDER BY loanDate DESC", (err, result)=> {
            if(err){
                console.warn("Error getting loan from database get all loans");
            }else {
                res.status(200).json(result)
                console.log(result);
            }
        });
    }catch (err){
        console.log(err);
    }
});


router.delete("/deleteLoan/:id", (req, res)=> {
    try {
        const loanId = req.params.id;
        // console.log(loanId);
    connection.query(`delete from loan where loanId = ${loanId}` , (err, results, fields)=> {
        if(err){
            throw err;
        }
        res.status(200).json({message: 'loan deleted successfully', results: results, deleteId: loanId});
    });
    }
    catch (err){
        console.log(err);
    }
});

router.post("/loanSearch", (req, res) => {

    try {
        const searchCriteria  = req.body.searchInput;
        console.log(searchCriteria);

    if (!searchCriteria) {
    return res.status(400).json({ error: 'Search criteria is required.' });
    }

    // const query = `SELECT * FROM loan
    //             WHERE loanName LIKE ? OR loanDescription LIKE ?`;
    const query = `SELECT * FROM loan
                    WHERE loanName LIKE ?`;

    const searchTerm = `%${searchCriteria}%`;

    connection.query(query, [searchTerm], (err, results) => {
    if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error.' });
    }

    if (results && results.length === 0) {
        res.status(404).json({ message: 'No matching employees found.' });
    }

    res.status(200).json({ results });
    });
    }catch (err){
        console.log(err);
    }
});

router.get("/viewLoans/:id", async(req, res) => {
    try {
        // console.log(req.body);
        const empId = req.params.id;
        // console.log(empId);

        const repayLoanBalance = await retrieveLoanData(empId);
        console.log("repay Balance", repayLoanBalance)

        connection.query(`SELECT * FROM loan WHERE empId = ${empId} ORDER BY loanDate DESC`, (err, result)=> {
        if(err){
            console.warn("Error getting loan from database getEmployee");
        }else {
                // Create a map for quick look-up based on a common key (e.g., 'id')
                const map2 = new Map();
                if(repayLoanBalance){
                    for (const item of repayLoanBalance) {
                        // console.log("item", item);
                        // map2.set(item.id, item);
                        map2.set(item.empId, item);
                        // console.log("map 2", map2);
                    }
                }

                const combinedArray = result.map((item1) => {
                    // console.log("item1", item1);
                    // const item2 = map2.get(item1.id);
                    const item2 = map2.get(item1.empId);
                    // console.log("item2", item2);
                    //   // Merge fields from the second array into the first array
                    if (item2 && item2.hasOwnProperty('amount')) {
                        // Merge the 'amount' field from item2 into item1 with a different key name
                        // console.log("item1.amount", item1);
                        console.log("item2.amount", item2);
                        return { ...item1, loanBalance: item2.amount };
                        }
                      return item1; // If there's no corresponding item in the second array, keep the original item
                    });

                    // console.log(combinedArray);
                // console.log("viewLoans", result)
                // res.status(200).json(result)
                res.status(200).json(combinedArray)
            }
        });
    }catch (err){
        console.log(err);
    }
});

async function retrieveLoanData(empId) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM loanrepay WHERE empId = ?", [empId], (err, rows) => {
            if (err) {
                reject(err);
            } else if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows); 
            }
        });
    });
}

router.get("/payloan/:id", (req, res) => {
    try {
        // console.log(req.body);
        const loanId = req.params.id;
        // console.log(loanId);
        connection.query(`SELECT empId, loanId FROM loan WHERE loanId = ${loanId}`, (err, result)=> {
            if(err){
                console.warn("Error getting loan from database getEmployee");
            }else {
                console.log(result)
                res.status(200).json(result)
            }
        });
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;