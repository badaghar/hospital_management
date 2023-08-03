
import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect,useState } from 'react'
// import { useState } from 'react-js-dialog-box'
// import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
//var TableToExcel = require('table-to-excel')
var XLSX = require('xlsx')

const DownloadPurchaseReport = ({ purchaseMedicines,startDate,endDate,setDownload }) => {

  const [total,setTotal] = useState('')
  const [sgst,setsgst] = useState('')
  const [cgst,setcgst] = useState('')
  const [discount,setdiscount] = useState('')
  const [grandTotal,setgrandTotal] = useState('')

  const sum = async () =>{
    let t=0,s=0,c=0,d=0,g=0;
    purchaseMedicines.forEach((val)=>{
        t+= val.total
        s+= val.sgst
        c+=val.cgst
        d+=val.discount
        g+=val.grand_total
    })

    setTotal(t.toFixed(2))
    setsgst(s.toFixed(2))
    setcgst(c.toFixed(2))
    setdiscount(d.toFixed(2))
    setgrandTotal(t.toFixed(2))
  }



  useEffect(() => {

    sum()

    setTimeout(() => {



    var data = document.getElementById('download_excel')

    var file = XLSX.utils.table_to_book(data, { sheet: 'sheet1' })
    for (const sheetName of Object.keys(file.Sheets)) {
      const sheet = file.Sheets[sheetName];
      for (const cellAddress of Object.keys(sheet)) {
        const cell = sheet[cellAddress];
        if (cell.t === 'n') {
          cell.t = 's'; // Change the type to 's' (string/text)
          cell.v = `${cell.v}`; // Prefix the value with a single quote
        }
      }
    }



    // Apply bold formatting to rows based on date changes



    XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' })
    XLSX.writeFile(file, 'purchaseMedicineReport.xlsx')

    setDownload(false)
  }, 2000);
  }, [])

  const newFormateDate = (dt) => {
    const date = new Date(dt);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    // console.log(`${day}-${month}-${year}`)

    return `Date :- ${day}-${month}-${year} `;
  }

  let preDate = new Date(1990)

  const dateRows = (purchaseMedicine) => {
    const currentDate = new Date(purchaseMedicine.date);
    // console.log(currentDate)
    if (currentDate.getTime() !== preDate.getTime()) {
      // console.log("here")
      const dt = newFormateDate(currentDate)
      console.log(dt)
      preDate = currentDate
      return (
        <tr>
          <th colSpan={20}> {dt}  </th>
        </tr>
      );
    }
    // console.log('here')
    return null

  }
  return (<>
  <table className="rw-table" id='download_excel'>
        <thead>
        <tr>
          <th colSpan={8}>Purchase Medicine Report</th>
        </tr>
        <tr>
          <th colSpan={8}>Sidhdhi Vinayak Pharmacy</th>
        </tr>
        <tr>
          <th colSpan={8}>Near Tank Bund,Beside Saba School, Main Road Yadggiri 585202</th>
        </tr>
        <tr>
          <th colSpan={8}>Purchase Medicine Report {startDate} - {endDate}</th>
        </tr>
        <tr>
          <th colSpan={8}>Mobile No: 7760056992</th>
        </tr>
          <tr>
            <th colSpan={1}>Sl. No</th>
            <th colSpan={3}>Invoice no</th>
            <th colSpan={6}>Distributer Name</th>
            {/* <th colSpan={2}>Date</th> */}

            <th colSpan={2}>Total</th>
            <th colSpan={2}>Discount</th>
            <th colSpan={2}>Sgst</th>
            <th colSpan={2}>Cgst</th>
            <th colSpan={2}>Grand total</th>

          </tr>
        </thead>
        <tbody>
          {purchaseMedicines.map((purchaseMedicine,ind) => (
            <>
              {dateRows(purchaseMedicine)}
            <tr key={purchaseMedicine.id}>

              <td colSpan={1}>{ind+1}</td>
              <td colSpan={3}>{truncate(String(purchaseMedicine.invoiceNo))}</td>
              <td colSpan={6}>{truncate(purchaseMedicine.did.name)}</td>

              {/* <td colSpan={2}>{purchaseMedicine.date.split('T00:')[0]}</td> */}

              <td colSpan={2}>{truncate(purchaseMedicine.total.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.discount.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.sgst.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.cgst.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.grand_total.toFixed(2))}</td>

            </tr>
            </>
          ))




          }

          <tr></tr>
          <tr></tr>
          <tr>
            <td colSpan={10}></td>
            <td colSpan={2}>Total</td>
            <td colSpan={2}>Discount</td>
            <td colSpan={2}>Sgst</td>
            <td colSpan={2}>Cgst</td>
            <td colSpan={2}>Grand Total</td>
          </tr>
          <tr>
            <td colSpan={10}></td>
            <td colSpan={2}>{total}</td>
            <td colSpan={2}> {discount} </td>
            <td colSpan={2}>{sgst}</td>
            <td colSpan={2}>{cgst}</td>
            <td colSpan={2}>{grandTotal}</td>
          </tr>



        </tbody>
      </table>
  </>)
}

export default DownloadPurchaseReport
