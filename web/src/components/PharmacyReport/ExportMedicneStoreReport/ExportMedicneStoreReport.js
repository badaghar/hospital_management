import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect,useState } from 'react'
// import { useState } from 'react-js-dialog-box'
// import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
//var TableToExcel = require('table-to-excel')
var XLSX = require('xlsx')

const ExportMedicneStoreReport = ({setDownload,medicines}) => {
  // console.log(medicines)
  useEffect(() => {
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
    XLSX.writeFile(file, 'ExportMedicineStoke.xlsx')

    setDownload(false)
  }, 2000);
  }, [])



  return (
    <>
     <table className="rw-table" id='download_excel'>
        <thead>
        <tr>
          <th colSpan={8}> Medicine Stoke Report</th>
        </tr>
        <tr>
          <th colSpan={8}>siddhi vinayak pharmacy</th>
        </tr>
        <tr>
          <th colSpan={8}>Near Tank Bund,Beside Saba School, Main Road Yadggiri 585202</th>
        </tr>
        <tr>
          <th colSpan={8}>Mobile No: 7760056992</th>
        </tr>
        <tr>
            <th colSpan={1}>Sl. No</th>
            <th colSpan={6}> Name</th>
            <th colSpan={3}>Batch</th>
            {/* <th colSpan={2}>Date</th> */}
            <th colSpan={2}>Quantity</th>



          </tr>
        </thead>

        <tbody>
          {
            medicines.map(
              (med,ind)=>(

                <tr key={med.id}>
                <th colSpan={1}>{ind+1}</th>
                <th colSpan={6}> {med.pid.name}</th>
                <th colSpan={3}>{med.batch}</th>
                {/* <th colSpan={2}>Date</th> */}
                <th colSpan={2}>{med.quantity}</th>



              </tr>

              )
            )
}
          </tbody>

        </table>


    </>
  )
}

export default ExportMedicneStoreReport
