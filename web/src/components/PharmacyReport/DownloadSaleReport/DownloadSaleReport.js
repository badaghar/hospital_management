
import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useState } from 'react'
// import { QUERY } from 'src/components/saleMedicine/saleMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
//var TableToExcel = require('table-to-excel')
var XLSX = require('xlsx')

const DownloadSaleReport = ({ saleMedicines, startDate, endDate, setDownload }) => {
  // const [date, setDate] = useState(new Date(1990))
  // const [preDate, setPreDate] = useState(new Date(1990))
  // console.log(date)
  useEffect(() => {
    var data = document.getElementById('download_excel')

    var file = XLSX.utils.table_to_book(data, { sheet: 'sheet1' })

    XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' })

    XLSX.writeFile(file, 'saleMedicineReport.' + 'xlsx')
    // navigate(routes.saleMedicines())
    setDownload(false)
  }, [])

  const newFormateDate = (dt) => {
    const date = new Date(dt);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year

    return `Date :- ${day}-${month}-${year}`;
  }
  let preDate = new Date(1990)

  const dateRows = (saleMedicine) => {
    const currentDate = new Date(saleMedicine.date);
    if (currentDate.getTime() !== preDate.getTime()) {
      // console.log("here")
      preDate = currentDate
      return (
        <tr>
          <th colSpan={20}> {newFormateDate(currentDate)}  </th>
        </tr>
      );
    }
    // console.log('here')
    return <></>;
    // return(
    //   <tr>
    //     <th>hello</th>
    //   </tr>
    // )
  };
  return (<>
    <table className="rw-table" id='download_excel'>
      <thead>
        <tr>
          <th colSpan={8}>Sale Medicine Report</th>
        </tr>
        <tr>
          <th colSpan={8}>Sidhdhi Vinayak Multi Speciality Hospital</th>
        </tr>
        <tr>
          <th colSpan={8}>Near Tank Bund,Beside Saba School, Main Road Yadggiri 585202</th>
        </tr>
        <tr>
          <th colSpan={8}>Sale Medicine Report {startDate} - {endDate}</th>
        </tr>
        <tr>
          <th colSpan={8}>Mobile No: 7760056992</th>
        </tr>
        <tr>
          <th colSpan={1}>Sl. No</th>
          <th colSpan={3}>Bill No</th>
          <th colSpan={6}>Patient Name</th>
          {/* <th colSpan={2}>Date</th> */}
          <th colSpan={2}>Total</th>
          <th colSpan={2}>Discount</th>
          <th colSpan={2}>Sgst</th>
          <th colSpan={2}>Cgst</th>
          <th colSpan={2}>Grand total</th>

        </tr>
      </thead>
      <tbody>
        {saleMedicines.map((saleMedicine, ind) => (
          <>
            {dateRows(saleMedicine)}


            <tr key={saleMedicine.id}>

              <td colSpan={1}>{ind + 1}</td>
              <td colSpan={3}>{truncate(saleMedicine.billNo)}</td>
              <td colSpan={6}>{truncate(saleMedicine.patient.name)}</td>

              {/* <td colSpan={2}>{saleMedicine.date.split('T00:')[0]}</td> */}

              <td colSpan={2}>{truncate(saleMedicine.total.toFixed(2))}</td>
              <td colSpan={2}>{truncate(saleMedicine.discount.toFixed(2))}</td>
              <td colSpan={2}>{truncate(saleMedicine.sgst.toFixed(2))}</td>
              <td colSpan={2}>{truncate(saleMedicine.cgst.toFixed(2))}</td>
              <td colSpan={2}>{truncate(saleMedicine.grand_total.toFixed(2))}</td>

            </tr>
          </>
        ))}
      </tbody>
    </table>
  </>)
}

export default DownloadSaleReport

