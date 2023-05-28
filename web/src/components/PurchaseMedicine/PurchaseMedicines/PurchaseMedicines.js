import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePurchaseMedicineMutation($id: Int!) {
    deletePurchaseMedicine(id: $id) {
      id
    }
  }
`

const PurchaseMedicinesList = ({ purchaseMedicines }) => {
  const [search_data, setSearch_data] = useState(purchaseMedicines)
  const [rows_count, setRows_count] = useState(purchaseMedicines.length <= 5 ? 5 : 10)
  const [deletePurchaseMedicine] = useMutation(
    DELETE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine deleted')
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
      confirm('Are you sure you want to delete purchaseMedicine ' + id + '?')
    ) {
      deletePurchaseMedicine({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = purchaseMedicines.filter((val) => {
      return (
        val.invoiceNo
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 10)
    setSearch_data(filterData)
  }

  const columns = [
    {
      Header: 'Invoice No',
      accessor: 'invoiceNo',
    },
    {
      Header: 'Distributer Name',
      accessor: 'did.name',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Total',
      accessor: 'total',
    },

    {
      Header: 'Discount',
      accessor: 'discount',
    },
    {
      Header: 'SGST',
      accessor: 'sgst',
    },
    {
      Header: 'CGST',
      accessor: 'cgst',
    },
    {
      Header: 'Grand Total',
      accessor: 'grand_total',
    },


    {
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.purchaseMedicine({ id: original.id })}
            title={
              'Show purchaseMedicine ' + original.id + ' detail'
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
    placeholder={"Search By Typing Invoice No"}
    columns={columns}
    rows_count={rows_count}
    search_data={search_data}
    />

    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         {/* <th>Id</th> */}
    //         <th>Invoice no</th>
    //         <th>Distributer Name</th>
    //         <th>Date</th>
    //         {/* <th>Medicine</th> */}
    //         <th>Total</th>
    //         <th>Discount</th>
    //         <th>Sgst</th>
    //         <th>Cgst</th>
    //         <th>Grand total</th>
    //         {/* <th>Created at</th>
    //         <th>Updated at</th> */}
    //         <th><Link
    //           to={routes.downloadPurchaseMedicine()}

    //           className="rw-button rw-button-small"
    //         >
    //           Download
    //         </Link></th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {purchaseMedicines.map((purchaseMedicine) => (
    //         <tr key={purchaseMedicine.id}>
    //           {/* <td>{truncate(purchaseMedicine.id)}</td> */}
    //           <td>{truncate(purchaseMedicine.invoiceNo)}</td>
    //           <td>{truncate(purchaseMedicine.did.name)}</td>

    //           <td>{timeTag(purchaseMedicine.date)}</td>
    //           {/* <td>{jsonTruncate(purchaseMedicine.medicine)}</td> */}
    //           <td>{truncate(purchaseMedicine.total)}</td>
    //           <td>{truncate(purchaseMedicine.discount)}</td>
    //           <td>{truncate(purchaseMedicine.sgst)}</td>
    //           <td>{truncate(purchaseMedicine.cgst)}</td>
    //           <td>{truncate(purchaseMedicine.grand_total)}</td>
    //           {/* <td>{timeTag(purchaseMedicine.created_at)}</td>
    //           <td>{timeTag(purchaseMedicine.updated_at)}</td> */}
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.purchaseMedicine({ id: purchaseMedicine.id })}
    //                 title={
    //                   'Show purchaseMedicine ' + purchaseMedicine.id + ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>

    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default PurchaseMedicinesList
