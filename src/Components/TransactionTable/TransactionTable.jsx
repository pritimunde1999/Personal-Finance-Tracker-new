import React, { useState } from 'react'
import { Radio, Select, Table } from 'antd';
import { Option } from 'antd/es/mentions';
import { IoSearch } from "react-icons/io5";
import './TransactionTable.css'
import { Button } from '@mui/material';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
import moment from 'moment';



const TransactionTable = ({ transactions, addTransaction, fetchTransactions}) => {
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [sortkey, setSortKey] = useState('')
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ];
    
    
    let filteredElement = transactions.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && (typeFilter==='' || item.type.includes(typeFilter)))

    const sortedTransaction = [...filteredElement].sort((a, b) => {
        
        if (sortkey === 'date') {
            return moment(a.date, 'DD-MM-YYYY').diff(moment(b.date, 'DD-MM-YYYY'));
        }
        else if (sortkey === 'amount') {
            return a.amount - b.amount
        }
        else {
            return 0
        }
    })

    function exportToCSV(){
        //need to install 'papaparse' for this 
        let csv = unparse({
            fields : ["name","type","date","tag","amount"],
            data: transactions
        })

        var data = new Blob([csv],{type:"text/csv;charset=utf-8;"})
        var csvURL = window.URL.createObjectURL(data)
        const tempLink = document.createElement('a')
        tempLink.href = csvURL
        tempLink.setAttribute("download","transactions.csv")
        tempLink.click()
    }

    function importFromCSV(e){
         e.preventDefault();
        try{
            parse(e.target.files[0],{
                header: true,
                complete : async function (results) {
                   
                    for(const transaction of results.data){
                        console.log(transaction)
                        const trimmedTransaction = {};
                        if(transaction.name!=='' && !isNaN(transaction.amount) && transaction.type!=='' && transaction.date!=='' && transaction.tag!=='')
                        {
                            
                        for (const [key, value] of Object.entries(transaction)) {
                            const trimmedKey = key.trim();
                            const trimmedValue = typeof value === 'string' ? value.trim() : value;
                            trimmedTransaction[trimmedKey] = trimmedValue;
                        }
                        trimmedTransaction.amount = parseInt(trimmedTransaction.amount);
    
                        
                        await addTransaction(trimmedTransaction,true)
                       }
    
                        // Convert amount to integer
                        
                    }
                }
            })
            toast.success("All Transactions Added!")
           fetchTransactions()
            e.target.files = null
        }
        catch(e){
            toast.error(e.message)
        }
    }


    return (
       
        <div className='table'>
            <div className='searchbar'>
                <div className='input-bar'>
                    <IoSearch />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name' />
                </div>
                <Select
                    className='select select-with-border'
                    onChange={(value) => setTypeFilter(value)}
                    value={typeFilter}
                    placeholder='Filter'
                    allowClear
                >
                    <Option value=''>All</Option>
                    <Option value='income'>Income</Option>
                    <Option value='expense'>Expense</Option>
                </Select>
            </div>

            <div className='table-head'>
                    <h2>My Transactions</h2>
                    <Radio.Group
                        onChange={(e) => setSortKey(e.target.value)}
                        value={sortkey}
                    >

                        <Radio.Button value=''>No Sort</Radio.Button>
                        <Radio.Button value='date'>Sort By Date</Radio.Button>
                        <Radio.Button value='amount'>Sort By Amount</Radio.Button>
                    </Radio.Group>
                

                <div className='buttons'>
                    <Button style={{color:'var(--theme)',borderColor:'var(--theme)'}} onClick={exportToCSV}  variant='outlined'>Export To CSV</Button>
                    {/* <Button style={{backgroundColor:'var(--theme)'}} onClick={importFromCSV} variant='contained'>Import To CSV</Button> */}
                    <label for='file-csv' className='btn'>Import From CSV</label>
                    <input 
                      id='file-csv'
                      type='file'
                      accept='.csv'
                      required
                      onChange={importFromCSV}
                      style={{display:'none'}}
                      />
                </div>
                </div>

            <Table dataSource={sortedTransaction} columns={columns} />

        </div>
      
    )
}
export default TransactionTable