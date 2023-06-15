import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/Medicine/MedicinesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_MEDICINE_MUTATION = gql`
  mutation DeleteMedicineMutation($id: Int!) {
    deleteMedicine(id: $id) {
      id
    }
  }
`

const MedicinesList = ({ medicines }) => {
  const [search_data, setSearch_data] = useState(medicines)
  const [rows_count, setRows_count] = useState(medicines.length <= 5 ? 5 : 10)
  const [deleteMedicine] = useMutation(DELETE_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('Medicine deleted')
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
    if (confirm('Are you sure you want to delete medicine ' + id + '?')) {
      deleteMedicine({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = medicines.filter((val) => {
      return (
        val.pid.name
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
      headerClassName: 'text-left',
      Header: 'Name',
      accessor: 'pid.name',
    },
    {
      headerClassName: 'text-left',
      Header: 'Batch',
      accessor: 'batch',
    },
    {
      headerClassName: 'text-left',
      Header: 'Exp Date',
      accessor: 'exp',
      Cell: ({ original }) => (
          original.exp.split('-')[1] + '-'+ original.exp.split('-')[0]
        )
    },
    {
      headerClassName: 'text-left',
      Header: 'MRP',
      accessor: 'mrp',
      Cell: ({ original }) => (
        original.mrp.toFixed(2)
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Quantity',
      accessor: 'quantity',
    },
    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (

        <nav className="rw-table-actions">
                  <Link
                    to={routes.medicine({ id: original.id })}
                    title={'Show medicine ' + original.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  {/* <Link
                    to={routes.editMedicine({ id: original.id })}
                    title={'Edit medicine ' + original.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete medicine ' + original.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(original.id)}
                  >
                    Delete
                  </button> */}
                </nav>
      ),
    },
  ]

  return (
    <>
            <SearchTable
    change={change}
    placeholder={"Search By Typing Medicine Name"}
    columns={columns}
    rows_count={rows_count}
    search_data={search_data}
    className=''
    />
    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Quantity</th>
    //         <th>Product Name</th>
    //         <th>Batch</th>
    //         <th>Exp</th>
    //         <th>Mrp</th>
    //         <th>Sgst</th>
    //         <th>Cgst</th>
    //         <th>Discount</th>

    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {medicines.map((medicine) => (
    //         <tr key={medicine.id}>

    //           <td>{truncate(medicine.quantity)}</td>
    //           <td>{truncate(medicine.pid.name)}</td>
    //           <td>{truncate(medicine.batch)}</td>
    //           <td>{timeTag(medicine.exp)}</td>
    //           <td>{truncate(medicine.mrp)}</td>
    //           <td>{truncate(medicine.sgst)}</td>
    //           <td>{truncate(medicine.cgst)}</td>
    //           <td>{truncate(medicine.discount)}</td>

    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.medicine({ id: medicine.id })}
    //                 title={'Show medicine ' + medicine.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editMedicine({ id: medicine.id })}
    //                 title={'Edit medicine ' + medicine.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete medicine ' + medicine.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(medicine.id)}
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

export default MedicinesList
