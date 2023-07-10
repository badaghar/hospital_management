
import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'
// import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
//var TableToExcel = require('table-to-excel')
var XLSX = require('xlsx')

const DownloadPurchaseReport = ({ purchaseMedicines,startDate,endDate,setDownload }) => {
  useEffect(() => {
    var data = document.getElementById('download_excel')

    var file = XLSX.utils.table_to_book(data, { sheet: 'sheet1' })

    XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' })

    XLSX.writeFile(file, 'purchaseMedicineReport.' + 'xlsx')
    // navigate(routes.purchaseMedicines())
    setDownload(false)
  }, [])
  return (<>
  <table className="rw-table" id='download_excel'>
        <thead>
        <tr>
          <th colSpan={8}>Purchase Medicine Report</th>
        </tr>
        <tr>
          <th colSpan={8}>Sidhdhi Vinayak Multi Speciality Hospital</th>
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
            <th colSpan={2}>Date</th>

            <th colSpan={2}>Total</th>
            <th colSpan={2}>Discount</th>
            <th colSpan={2}>Sgst</th>
            <th colSpan={2}>Cgst</th>
            <th colSpan={2}>Grand total</th>

          </tr>
        </thead>
        <tbody>
          {purchaseMedicines.map((purchaseMedicine,ind) => (
            <tr key={purchaseMedicine.id}>

              <td colSpan={1}>{ind+1}</td>
              <td colSpan={3}>{truncate(purchaseMedicine.invoiceNo)}</td>
              <td colSpan={6}>{truncate(purchaseMedicine.did.name)}</td>

              <td colSpan={2}>{purchaseMedicine.date.split('T00:')[0]}</td>

              <td colSpan={2}>{truncate(purchaseMedicine.total.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.discount.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.sgst.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.cgst.toFixed(2))}</td>
              <td colSpan={2}>{truncate(purchaseMedicine.grand_total.toFixed(2))}</td>

            </tr>
          ))}
        </tbody>
      </table>
  </>)
}

export default DownloadPurchaseReport
