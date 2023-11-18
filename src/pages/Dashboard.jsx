import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Cards from '../Components/Card/Cards'
import AddIncome from '../Components/Modals/AddIncome'
import AddExpense from '../Components/Modals/AddExpense'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { toast } from 'react-toastify'
import moment from 'moment'
import TransactionTable from '../Components/TransactionTable/TransactionTable'
import Charts from '../Components/Charts/Charts'


const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([])
  const [loading, setLoding] = useState(false);
  const [users] = useAuthState(auth);
  const [accountTransaction, setAccountTransaction] = useState({ income: 0, expense: 0, balance: 0 })

  const onFinish = (values, type) => {

    const newTransaction = {
      type: type,
      date: moment(values.date.$d).format('DD-MM-YYYY'),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name
    }

    addTransaction(newTransaction);
  }

  async function addTransaction(transaction,many) {
  
    try {
      const docref = await addDoc(
        collection(db, `users/${users.uid}/transactions`),
        transaction
      )

      if(!many) toast.success('Transaction Added!')
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr)
      calculateBalance()
      // fetchTransactions();
      if(isExpenseModalVisible)
      {
         setIsExpenseModalVisible(false);
      }
      else if(isIncomeModalVisible)
      {
        setIsIncomeModalVisible(false)
      }
    
    }
    catch (e) {
      console.log(e.message)
      if(!many) toast.error('Transaction couldnt Added!')
    }
    
  }

  useEffect(() => {
  
    fetchTransactions();
  }, [users])

 

  useEffect(() => {
   
    calculateBalance();
  }, [transactions])

  async function fetchTransactions() {
    
    setLoding(true);
    if (users) {
      const q = query(collection(db, `users/${users.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query docs.
        transactionArray.push(doc.data());
      })
      console.log(transactionArray)-
      
      setTransactions(transactionArray);
      toast.success("Transaction Fetched!")
    }
    setLoding(false);
  }

  function calculateBalance() {

    let incomeTotal = 0, expenseTotal = 0;

    transactions.forEach((transaction) => {

      if (transaction.type === 'income') {
        incomeTotal += transaction.amount;
      }
      else {
        expenseTotal += transaction.amount;
      }
    });
    let balance = incomeTotal - expenseTotal;
    setAccountTransaction({ ...accountTransaction, income: incomeTotal, expense: expenseTotal, balance: balance });
  }


  const sortedTransaction = transactions.sort((a, b) => {
      return moment(a.date, 'DD-MM-YYYY').diff(moment(b.date, 'DD-MM-YYYY'));
    })




  return (
    <div>
      <Header />

      {loading ? <p>Loding...</p> :
        <>
          <Cards setIsExpenseModalVisible={setIsExpenseModalVisible} setIsIncomeModalVisible={setIsIncomeModalVisible} accountTransaction={accountTransaction} />
          {transactions.length!=0 ? <Charts sortedTransaction={sortedTransaction}/> : <p>Nothing...</p>}
          <AddIncome isIncomeModalVisible={isIncomeModalVisible} setIsIncomeModalVisible={setIsIncomeModalVisible} onFinish={onFinish} />
          <AddExpense isExpenseModalVisible={isExpenseModalVisible} setIsExpenseModalVisible={setIsExpenseModalVisible} onFinish={onFinish} />
          <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions}/>
        </>
      }
      
    </div>
  )
}

export default Dashboard