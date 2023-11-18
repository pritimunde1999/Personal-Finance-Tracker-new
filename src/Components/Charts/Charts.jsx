import React from 'react'
import { Line, Pie } from '@ant-design/charts';

const Charts = ({sortedTransaction}) => {
    const data = sortedTransaction.map((item)=>{
        return {date:item.date,amount:item.amount}
    })

    const spendingData = sortedTransaction.filter((transaction)=>{
        if(transaction.type==='expense')
        {
            return {tag: transaction.tag, amount:transaction.amount}
        }
    })

    const finalSpending = spendingData.reduce((acc,obj)=>{
        let key = obj.tag;
        if(!acc[key])
        {
            acc[key] = {tag: obj.tag, amount:obj.amount}
        }
        else
        {
            acc[key].amount += obj.amount
        }
        return acc
    },{})

      const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };

      const spendingConfig = {
        data : Object.values(finalSpending),
        width: 500,
        height: 200,
        
       angleField: 'amount',
        colorField: 'tag',
        
      };
    
      let chart;
      let piechart;

  return (
    <div className='charts-wrapper'> 
        <div className='linechart' style={{backgroundColor:'#ffffff'}}>
           <h2 style={{marginBottom:'2rem'}}>Financial Statistics</h2>
           <div style={{ backgroundColor: '#ffffff' }}>
           <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
           </div>
        </div>
        <div>
            <h2>Toatal Spendings</h2>
            <Pie {...spendingConfig} onReady={(chartInstance) => (piechart = chartInstance)} />
        </div>
    </div>
  )
}

export default Charts