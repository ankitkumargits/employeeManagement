const router = require("express").Router();
const connection = require("../db/conn");

router.get("/getloanrepay", (req, res)=> {
    try {
        connection.query("select * from loanrepay", (err, result)=> {
            if(err){
                console.warn(err);
            }else {
                res.status(200).json({success:result});
            }
        });
    }catch(err){
        console.log(err);
    }
});

router.post("/addloanrepay", async (req, res)=> {
    try {
        console.log(req.body);
    // const data = req.body;
    const { loanId, repayDate, empId, amount} = req.body;

    const data = {
        // repaymentId: repaymentId,
        loanId: loanId,
        repayDate: repayDate,
        empId: empId,
        amount: amount
    }
    const loanData = await retrieveLoanData(loanId); // Implement this function

    if (loanData) {
        console.log("loanData",loanData);
        // console.log("loanData amount",loanData.amount);
        console.log("repay amount", amount);
        if (!loanData) {
            return res.status(404).json({ message: "Your loan not found" });
        }
        // if loanData is got 
        let currentLoanBalance;
            if(loanData.amount > amount ){
                console.log("Your loan is paid");
                currentLoanBalance = loanData.amount - amount;
                console.log("currentLoanBalance", currentLoanBalance);

                // connection.query("UPDATE loan SET loanBalance = ? WHERE loanId = ?", [currentLoanBalance, loanId], (err, result, fields) => {
                //     if (err) {
                //         if (err.code === "ER_DUP_ENTRY") {
                //             res.status(400).json({ error: "Duplicate entry: Loan ID already exists" });
                //         } else {
                //             res.status(500).json({ error: "Internal server error" });
                //         }
                //     } else {
                //         console.log("result", result);
                //         res.status(200).json({ result: result, message: "Your loan is paid" });
                //     }
                // });

                connection.query("insert into loanrepay set ?", data, (err, result, fields)=> {
                    if(err){
                        // console.error(err.stack);
                        // throw  Error(err);
                        if (err.code === "ER_DUP_ENTRY") {
                                res.status(400).json({ message: "Duplicate entry: repayment ID already exists" });
                            } else {
                            // console.error(err.stack);
                                res.status(500).json({ message: "Internal server error" });
                            }
                    }else {
                    // console.log(result)
                    res.status(200).json({result: result, message: "Added loanRepay"})
                    }
                });

            }else if(loanData.amount < amount){
                if(loanData.amount === 0){
                    console.log("You have no loan")
                    res.status(200).json({ message: "You have no loan" });
                }else {
                    console.log("Repay amount should be less than loan amount");
                    res.status(200).json({ message: "Repay amount should be less than loan amount" });
                }
            }else {
                console.log("Invalid amount");
                res.status(200).json({ message: "Invalid amount" });
            }

        // Combine loanData and data as needed
        // Example: data = { ...data, ...loanData };
    }else {
        res.status(200).json({message: "Please Enter valid Details"})
        console.log("Please Enter valid Details");
    }
    }catch(err){
        console.log(err);
    }
});

async function retrieveLoanData(loanId) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM loan WHERE loanId = ?", [loanId], (err, rows) => {
            if (err) {
                reject(err);
            } else if (rows.length === 0) {
                resolve(null); // Loan not found
            } else {
                resolve(rows[0]); // Return the first row as loan data
            }
        });
    });
}


router.get("/getallloanrepay", (req, res) => {
    connection.query("select * from loanrepay ORDER BY repayDate DESC", (err, result)=> {
        if(err){
            console.warn(err);
        }else {
            res.status(200).json(result);
        }
    })
});

router.delete("/deleteLoanRepay/:id", (req, res)=> {
    const loanRepayId = req.params.id;
    // console.log(loanRepayId);
    connection.query(`delete from loanrepay where repaymentId = ${loanRepayId}` , (err, results, fields)=> {
        if(err){
            throw err;
        }
        res.status(200).json({message: 'loan Repay deleted successfully', results: results, deleteId: loanRepayId});
    });
});

router.post("/loanrepaySearch", (req, res) => {
    
    const searchCriteria  = req.body.searchInput;
    console.log(searchCriteria);

    if (!searchCriteria) {
    return res.status(400).json({ error: 'Search criteria is required.' });
    }

    const query = `SELECT * FROM loanrepay
                    WHERE repaymentId LIKE ?`;
                    // WHERE empId = ? OR empName LIKE ?`;

    const searchTerm = `%${searchCriteria}%`;

    connection.query(query, [searchCriteria, searchTerm], (err, results) => {
    if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error.' });
    }

    if (results.length === 0) {
        return res.status(404).json({ message: 'No matching employees found.' });
    }

    res.status(200).json({ results });
    });
});

module.exports = router;