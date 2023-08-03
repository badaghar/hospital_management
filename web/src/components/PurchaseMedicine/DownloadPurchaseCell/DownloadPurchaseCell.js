import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'
// import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
//var TableToExcel = require('table-to-excel')
var XLSX = require('xlsx')
export const QUERY = gql`
  query FindDownloadPurchaseQuery{
    purchaseMedicines {
      id
      invoiceNo
      distributerId
      did{
        id
        name
      }
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
       }
          }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ purchaseMedicines }) => {

  useEffect(() => {
    var data = document.getElementById('download_excel')

    var file = XLSX.utils.table_to_book(data, { sheet: 'sheet1' })

    XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' })

    XLSX.writeFile(file, 'masterexcel.' + 'xlsx')
    navigate(routes.purchaseMedicines())
  }, [])
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
          <th colSpan={8}>Mobile No: 7760056992</th>
        </tr>
          <tr>
            <th>Sl. No</th>
            <th>Invoice no</th>
            <th>Distributer Name</th>
            <th>Date</th>

            <th>Total</th>
            <th>Discount</th>
            <th>Sgst</th>
            <th>Cgst</th>
            <th>Grand total</th>

          </tr>
        </thead>
        <tbody>
          {purchaseMedicines.map((purchaseMedicine,ind) => (
            <tr key={purchaseMedicine.id}>

              <td>{ind+1}</td>
              <td>{truncate(purchaseMedicine.invoiceNo)}</td>
              <td>{truncate(purchaseMedicine.did.name)}</td>

              <td>{timeTag(purchaseMedicine.date)}</td>

              <td>{truncate(purchaseMedicine.total)}</td>
              <td>{truncate(purchaseMedicine.discount)}</td>
              <td>{truncate(purchaseMedicine.sgst)}</td>
              <td>{truncate(purchaseMedicine.cgst)}</td>
              <td>{truncate(purchaseMedicine.grand_total)}</td>

            </tr>
          ))}
        </tbody>
      </table>
  </>)
}
