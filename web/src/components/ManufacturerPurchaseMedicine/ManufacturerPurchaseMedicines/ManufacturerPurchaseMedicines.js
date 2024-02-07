import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/ManufacturerPurchaseMedicine/ManufacturerPurchaseMedicinesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeleteManufacturerPurchaseMedicineMutation($id: Int!) {
    deleteManufacturerPurchaseMedicine(id: $id) {
      id
    }
  }
`

const ManufacturerPurchaseMedicinesList = ({
  manufacturerPurchaseMedicines,
}) => {
  const [search_data, setSearch_data] = useState(manufacturerPurchaseMedicines)
  const [rows_count, setRows_count] = useState(manufacturerPurchaseMedicines.length )
  const [deleteManufacturerPurchaseMedicine] = useMutation(
    DELETE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ManufacturerPurchaseMedicine deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm(
        'Are you sure you want to delete manufacturerPurchaseMedicine ' +
          id +
          '?'
      )
    ) {
      deleteManufacturerPurchaseMedicine({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = manufacturerPurchaseMedicines.filter((val) => {
      return (
        val.pid.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length )
    setSearch_data(filterData)
  }

  const columns = [
    {
       headerClassName: 'text-left',
      Header:  'SL. No',
      // accessor: 'id',
            Cell: ({index}) => (
            index+1
        )
    },
    {
       headerClassName: 'text-left',
      Header:  'Product Name',
      accessor: 'pid.name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Amount',
      accessor: 'amount',
      Cell: ({ original }) => (
        original.amount.toFixed(2)
      )

    },
    {
       headerClassName: 'text-left',
      Header:  'Amount + GST',
      accessor: 'net_amount',
      Cell: ({ original }) => (
        original.net_amount.toFixed(2)
      )
    },
  ]

  return (

    <>
    <SearchTable
change={change}
placeholder={"Search By Typing Product Name"}
columns={columns}
rows_count={rows_count}
search_data={search_data}
/>
</>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Product id</th>
    //         <th>Batch</th>
    //         <th>Paid qty</th>
    //         <th>Free qty</th>
    //         <th>Pack</th>
    //         <th>Exp</th>
    //         <th>Mrp</th>
    //         <th>Rate</th>
    //         <th>Dis</th>
    //         <th>Sgst</th>
    //         <th>Cgst</th>
    //         <th>Amount</th>
    //         <th>Net amount</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {manufacturerPurchaseMedicines.map((manufacturerPurchaseMedicine) => (
    //         <tr key={manufacturerPurchaseMedicine.id}>
    //           <td>{truncate(manufacturerPurchaseMedicine.id)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.productId)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.batch)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.paid_qty)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.free_qty)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.pack)}</td>
    //           <td>{timeTag(manufacturerPurchaseMedicine.exp)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.mrp)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.rate)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.dis)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.sgst)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.cgst)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.amount)}</td>
    //           <td>{truncate(manufacturerPurchaseMedicine.net_amount)}</td>
    //           <td>{timeTag(manufacturerPurchaseMedicine.created_at)}</td>
    //           <td>{timeTag(manufacturerPurchaseMedicine.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.manufacturerPurchaseMedicine({
    //                   id: manufacturerPurchaseMedicine.id,
    //                 })}
    //                 title={
    //                   'Show manufacturerPurchaseMedicine ' +
    //                   manufacturerPurchaseMedicine.id +
    //                   ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editManufacturerPurchaseMedicine({
    //                   id: manufacturerPurchaseMedicine.id,
    //                 })}
    //                 title={
    //                   'Edit manufacturerPurchaseMedicine ' +
    //                   manufacturerPurchaseMedicine.id
    //                 }
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={
    //                   'Delete manufacturerPurchaseMedicine ' +
    //                   manufacturerPurchaseMedicine.id
    //                 }
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() =>
    //                   onDeleteClick(manufacturerPurchaseMedicine.id)
    //                 }
    //               >
    //                 Delete
    //               </button>
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default ManufacturerPurchaseMedicinesList
