import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/PaymentPurchaseMedicine/PaymentPurchaseMedicinesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_PAYMENT_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePaymentPurchaseMedicineMutation($id: Int!) {
    deletePaymentPurchaseMedicine(id: $id) {
      id
    }
  }
`

const PaymentPurchaseMedicinesList = ({ paymentPurchaseMedicines }) => {
  const [search_data, setSearch_data] = useState(paymentPurchaseMedicines)
  const [rows_count, setRows_count] = useState(paymentPurchaseMedicines.length <= 5 ? 5 : 1000)
  const [deletePaymentPurchaseMedicine] = useMutation(
    DELETE_PAYMENT_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PaymentPurchaseMedicine deleted')
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
        'Are you sure you want to delete paymentPurchaseMedicine ' + id + '?'
      )
    ) {
      deletePaymentPurchaseMedicine({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = paymentPurchaseMedicines.purchaseMedicine.invoiceNo.filter((val) => {
      return (
        val.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 1000)
    setSearch_data(filterData)
  }

  const columns = [
    {
      Header: 'Invoice No',
      accessor: 'purchaseMedicine.invoiceNo',
    },
    {
      Header: 'Total',
      accessor: 'total',
    },
    {
      Header: 'Balance',
      accessor: 'balance',
    },
    {
      Header: 'Paid',
      accessor: 'paid',
    },
    {
      Header: 'Method',
      accessor: 'method',
    },
    {
      Header: 'Remark',
      accessor: 'remark',
    },
    {
      Header: 'Updated At',
      accessor: 'updated_at',
      Cell: ({ original }) => (
          timeTag(original.updated_at)
        )
    },
    {
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
        <Link
          to={routes.paymentPurchaseMedicine({
            id: original.id,
          })}
          title={
            'Show paymentPurchaseMedicine ' +
            original.id +
            ' detail'
          }
          className="rw-button rw-button-small"
        >
          Show
        </Link>
      </nav>
      ),
    },

  ]

  return (

    <>
            <SearchTable
    change={change}
    placeholder={"Search By Typing Composition Name"}
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
    //         <th>Purchase medicine id</th>
    //         <th>Total</th>
    //         <th>Balance</th>
    //         <th>Paid</th>
    //         <th>Method</th>
    //         <th>Remark</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {paymentPurchaseMedicines.map((paymentPurchaseMedicine) => (
    //         <tr key={paymentPurchaseMedicine.id}>
    //           <td>{truncate(paymentPurchaseMedicine.id)}</td>
    //           <td>{truncate(paymentPurchaseMedicine.purchaseMedicineId)}</td>
    //           <td>{truncate(paymentPurchaseMedicine.total)}</td>
    //           <td>{truncate(paymentPurchaseMedicine.balance)}</td>
    //           <td>{truncate(paymentPurchaseMedicine.paid)}</td>
    //           <td>{truncate(paymentPurchaseMedicine.method)}</td>
    //           <td>{truncate(paymentPurchaseMedicine.remark)}</td>
    //           <td>{timeTag(paymentPurchaseMedicine.created_at)}</td>
    //           <td>{timeTag(paymentPurchaseMedicine.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.paymentPurchaseMedicine({
    //                   id: paymentPurchaseMedicine.id,
    //                 })}
    //                 title={
    //                   'Show paymentPurchaseMedicine ' +
    //                   paymentPurchaseMedicine.id +
    //                   ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editPaymentPurchaseMedicine({
    //                   id: paymentPurchaseMedicine.id,
    //                 })}
    //                 title={
    //                   'Edit paymentPurchaseMedicine ' +
    //                   paymentPurchaseMedicine.id
    //                 }
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={
    //                   'Delete paymentPurchaseMedicine ' +
    //                   paymentPurchaseMedicine.id
    //                 }
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(paymentPurchaseMedicine.id)}
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

export default PaymentPurchaseMedicinesList
