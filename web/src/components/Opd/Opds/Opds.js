import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/Opd/OpdsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_OPD_MUTATION = gql`
  mutation DeleteOpdMutation($id: Int!) {
    deleteOpd(id: $id) {
      id
    }
  }
`

const OpdsList = ({ opds }) => {
  const [search_data, setSearch_data] = useState(opds)
  const [rows_count, setRows_count] = useState(opds.length )
  const [deleteOpd] = useMutation(DELETE_OPD_MUTATION, {
    onCompleted: () => {
      toast.success('Opd deleted')
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
    if (confirm('Are you sure you want to delete opd ' + id + '?')) {
      deleteOpd({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = opds.filter((val) => {
      return (
        val.patient.name
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
      Header:  'Name',
      accessor: 'patient.name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Consultant doctor',
      accessor: 'consultant_doctor',
    },
    {
       headerClassName: 'text-left',
      Header:  'Payment mode',
      accessor: 'paymentMode',
    },
    {
       headerClassName: 'text-left',
      Header:  'Amount',
      accessor: 'amount',
    },
    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
                   <nav className="rw-table-actions">
                          <Link
                    to={routes.opd({ id: original.id })}
                    title={'Show opd ' + original.id + ' detail'}
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
    //         <th>Consultant doctor</th>
    //         <th>Charges</th>
    //         <th>Payment mode</th>
    //         <th>Amount</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Patient id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {opds.map((opd) => (
    //         <tr key={opd.id}>
    //           <td>{truncate(opd.id)}</td>
    //           <td>{truncate(opd.consultant_doctor)}</td>
    //           <td>{jsonTruncate(opd.charges)}</td>
    //           <td>{truncate(opd.paymentMode)}</td>
    //           <td>{truncate(opd.amount)}</td>
    //           <td>{timeTag(opd.created_at)}</td>
    //           <td>{timeTag(opd.updated_at)}</td>
    //           <td>{truncate(opd.patientId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.opd({ id: opd.id })}
    //                 title={'Show opd ' + opd.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               {/* <Link
    //                 to={routes.editOpd({ id: opd.id })}
    //                 title={'Edit opd ' + opd.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link> */}
    //               <button
    //                 type="button"
    //                 title={'Delete opd ' + opd.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(opd.id)}
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

export default OpdsList
