import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import Loan from "./components/Loan";
import LoanRepay from "./components/LoanRepay";
import Home from './components/Home';
import AddEmp from './components/AddEmp';
import AddLoan from './components/AddLoan';
import AddLoanRepay from './components/AddLoanRepay';
import Employees from './components/Employees';
import LoanList from './components/LoanList';
function App() {

  return (
    <>
    <Router>
        <Header/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/addemp" element={<AddEmp/>}/>
        <Route path="/employee" element={<Employees/>}/>
        <Route path="/addloan" element={<AddLoan/>}/>
        <Route path='/addloanemp/:empId' element={<AddLoan/>}/>
        <Route path="/loan" element={<Loan/>}/>
        <Route path="/loanlist" element={<LoanList/>}/>
        <Route path='/viewloans/:empId' element={<LoanList/>}/>
        <Route path="/addloanrepay" element={<AddLoanRepay/>}/>
        <Route path="/loanrepay" element={<LoanRepay/>}/>
        <Route path='/payloan/:loanId' element={<AddLoanRepay/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
