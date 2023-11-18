import React from 'react'
import {Row, Card} from 'antd'
import './Cards.css'
import Button from '@mui/material/Button';

const Cards = ({setIsExpenseModalVisible,setIsIncomeModalVisible,accountTransaction}) => {
 
  return (
    <div>
        <Row className='my-row'>
           <Card className='my-card' title='Current Balance'>
            <h5>₹ { accountTransaction.balance}</h5>
            <Button className='button' variant='contained' >Reset Balance</Button>
           </Card>

           <Card className='my-card' title='Total Income'>
            <h5>₹ { accountTransaction.income}</h5>
            <Button className='button' variant='contained' onClick={()=>setIsIncomeModalVisible(true)}>Add Income</Button>
           </Card>

           <Card className='my-card' title='Total Expense'>
            <h5>₹ { accountTransaction.expense}</h5>
            <Button className='button' variant='contained' onClick={()=>setIsExpenseModalVisible(true)}>Add Expense</Button>
           </Card>
        </Row>
    </div>
  )
}

export default Cards