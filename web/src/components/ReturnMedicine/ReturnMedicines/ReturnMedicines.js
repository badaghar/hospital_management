import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { QUERY } from 'src/components/ReturnMedicine/ReturnMedicinesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_RETURN_MEDICINE_MUTATION = gql`
  mutation DeleteReturnMedicineMutation($id: Int!) {
    deleteReturnMedicine(id: $id) {
      id
    }
  }
`

const ReturnMedicinesList = ({ returnMedicines }) => {
  const [search_data, setSearch_data] = useState(returnMedicines)
  const [rows_count, setRows_count] = useState(returnMedicines.length <= 5 ? 5 : 1000)
  const [deleteReturnMedicine] = useMutation(DELETE_RETURN_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('ReturnMedicine deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete returnMedicine ' + id + '?')) {
      deleteReturnMedicine({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value
    console.log(returnMedicines)

    let filterData = returnMedicines.filter((val) => {
      return (
        val.patient.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase()) ||

          val.patient.name
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
      headerClassName: 'text-left',
     Header:  'SL. No',
     // accessor: 'id',
           Cell: ({index}) => (
           index+1
       )
   },
    {
       headerClassName: 'text-left',
      Header:  'Date',
      accessor: 'date',
      Cell: ({ original }) => (
        original.date.split('T00:')[0]
      )
    },
    {

       headerClassName: 'text-left',
      Header:  'Patient Name',
      accessor: 'patient.name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Total',
      accessor: 'total',
      Cell: ({ original }) => (
        original.total.toFixed(2)
      )
    },
    {

       headerClassName: 'text-left',
      Header:  'SGST',
      accessor: 'sgst',
      Cell: ({ original }) => (
        original.sgst.toFixed(2)
      )
    },
    {
       headerClassName: 'text-left',
      Header:  'CGST',
      accessor: 'cgst',
      Cell: ({ original }) => (
        original.cgst.toFixed(2)
      )
    },
    {
       headerClassName: 'text-left',
      Header:  'Grand Total',
      accessor: 'grand_total',
      Cell: ({ original }) => (
        original.grand_total.toFixed(2)
      )
    },


    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.returnMedicine({ id: original.id })}
            title={
              'Show returnMedicine ' + original.id + ' detail'
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
        placeholder={"Search By Typing Patient Name"}
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
    //         <th>Date</th>
    //         <th>Medicine</th>
    //         <th>Total</th>
    //         <th>Discount</th>
    //         <th>Sgst</th>
    //         <th>Cgst</th>
    //         <th>Grand total</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Patient id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {returnMedicines.map((returnMedicine) => (
    //         <tr key={returnMedicine.id}>
    //           <td>{truncate(returnMedicine.id)}</td>
    //           <td>{timeTag(returnMedicine.date)}</td>
    //           <td>{jsonTruncate(returnMedicine.medicine)}</td>
    //           <td>{truncate(returnMedicine.total)}</td>
    //           <td>{truncate(returnMedicine.discount)}</td>
    //           <td>{truncate(returnMedicine.sgst)}</td>
    //           <td>{truncate(returnMedicine.cgst)}</td>
    //           <td>{truncate(returnMedicine.grand_total)}</td>
    //           <td>{timeTag(returnMedicine.created_at)}</td>
    //           <td>{timeTag(returnMedicine.updated_at)}</td>
    //           <td>{truncate(returnMedicine.patientId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.returnMedicine({ id: returnMedicine.id })}
    //                 title={
    //                   'Show returnMedicine ' + returnMedicine.id + ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editReturnMedicine({ id: returnMedicine.id })}
    //                 title={'Edit returnMedicine ' + returnMedicine.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete returnMedicine ' + returnMedicine.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(returnMedicine.id)}
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

export default ReturnMedicinesList
