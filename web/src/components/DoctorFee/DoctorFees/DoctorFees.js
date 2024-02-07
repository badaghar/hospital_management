import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/DoctorFee/DoctorFeesCell'
import { timeTag, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState,useEffect } from 'react'

const DELETE_DOCTOR_FEE_MUTATION = gql`
  mutation DeleteDoctorFeeMutation($id: Int!) {
    deleteDoctorFee(id: $id) {
      id
    }
  }
`

const DoctorFeesList = ({ doctorFees }) => {
  const [search_data, setSearch_data] = useState(doctorFees)
  const [rows_count, setRows_count] = useState(doctorFees.length <= 5 ? 5 : 1000)
  useEffect(()=>{
    setSearch_data(doctorFees)

  },[doctorFees])
  const [deleteDoctorFee] = useMutation(DELETE_DOCTOR_FEE_MUTATION, {
    onCompleted: () => {
      toast.success('DoctorFee deleted')
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
    if (confirm('Are you sure you want to delete doctorFee ' + id + '?')) {
      deleteDoctorFee({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = doctorFees.filter((val) => {
      return (
        val.did.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase()) ||
        val.type
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
      Header: 'SL. No',
      Cell: ({ index }) => (
        index + 1
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Name',
      accessor: 'did.name',
    },
    {
      headerClassName: 'text-left',
      Header: 'Fees Type',
      accessor: 'type',
    },
    {
      headerClassName: 'text-left',
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.doctorFee({ id: original.id })}
            title={'Show doctorFee ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          <Link
            to={routes.editDoctorFee({ id: original.id })}
            title={'Edit doctorFee ' + original.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            title={'Delete doctorFee ' + original.id}
            className="rw-button rw-button-small rw-button-red"
            onClick={() => onDeleteClick(original.id)}
          >
            Delete
          </button>
        </nav>
      ),
    },
  ]

  return (
    <>
      <SearchTable
        change={change}
        placeholder={"Search By Typing Doctor Name or Fees Type"}
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
    //         <th>Type</th>
    //         <th>Amount</th>
    //         <th>User id</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {doctorFees.map((doctorFee) => (
    //         <tr key={doctorFee.id}>
    //           <td>{truncate(doctorFee.id)}</td>
    //           <td>{truncate(doctorFee.type)}</td>
    //           <td>{truncate(doctorFee.amount)}</td>
    //           <td>{truncate(doctorFee.userId)}</td>
    //           <td>{timeTag(doctorFee.created_at)}</td>
    //           <td>{timeTag(doctorFee.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.doctorFee({ id: doctorFee.id })}
    //                 title={'Show doctorFee ' + doctorFee.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editDoctorFee({ id: doctorFee.id })}
    //                 title={'Edit doctorFee ' + doctorFee.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete doctorFee ' + doctorFee.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(doctorFee.id)}
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

export default DoctorFeesList
