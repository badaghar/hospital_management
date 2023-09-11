import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState,useEffect } from 'react'

import { QUERY } from 'src/components/IpdOperationPayment/IpdOperationPaymentsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation DeleteIpdOperationPaymentMutation($id: Int!) {
    deleteIpdOperationPayment(id: $id) {
      id
    }
  }
`

const IpdOperationPaymentsList = ({ ipdOperationPayments }) => {
  const [search_data, setSearch_data] = useState(ipdOperationPayments)
  const [rows_count, setRows_count] = useState(ipdOperationPayments.length <= 5 ? 5 : 10)
  const [refresh, setRefresh] = useState(false)
    useEffect(()=>{
    setSearch_data(ipdOperationPayments)

  },[ipdOperationPayments])
  const [deleteIpdOperationPayment] = useMutation(
    DELETE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment deleted')
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
      confirm('Are you sure you want to delete ipdOperationPayment ' + id + '?')
    ) {
      deleteIpdOperationPayment({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = ipdOperationPayments.filter((val) => {
      console.log(val.extra.date)
      return (
        val.ipd.patient.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase()) || val.ipd.patient.phone_no
            .toString()
            .toLowerCase()
            .includes(search_val.toLowerCase())
           || val.extra.date
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
      Header: 'SL. No',
      // accessor: 'id',
      Cell: ({ index }) => (
        index + 1
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Name',
      accessor: 'ipd.patient.name',
    },
    {
      headerClassName: 'text-left',
      Header: 'Phone No',
      accessor: 'ipd.patient.phone_no',
    },
    {
      headerClassName: 'text-left',
      Header: 'Operation',
      accessor: 'operation_name',

    },
    {
      headerClassName: 'text-left',
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      headerClassName: 'text-left',
      Header: 'Operation Date',
      // accessor: 'discharge_date',
      Cell: ({ original }) => (
        timeTag(original.extra?.date) || '-'
      )
    },

  ]

  return (

    <>
    {

        <div className='z-10 text-black bg-white'>

          <span className='px-16'>
           Note :- Date Formate For Search is YYYY-MM--DD
          </span>

      <SearchTable
        change={change}
        placeholder={"Search By Typing Operation date or patient name or phone no"}
        columns={columns}
        rows_count={rows_count}
        search_data={search_data}
        />
        </div>
        }
  </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Operation name</th>
    //         <th>Amount</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Ipd id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {ipdOperationPayments.map((ipdOperationPayment) => (
    //         <tr key={ipdOperationPayment.id}>
    //           <td>{truncate(ipdOperationPayment.id)}</td>
    //           <td>{truncate(ipdOperationPayment.operation_name)}</td>
    //           <td>{truncate(ipdOperationPayment.amount)}</td>
    //           <td>{timeTag(ipdOperationPayment.created_at)}</td>
    //           <td>{timeTag(ipdOperationPayment.updated_at)}</td>
    //           <td>{truncate(ipdOperationPayment.ipdId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.ipdOperationPayment({
    //                   id: ipdOperationPayment.id,
    //                 })}
    //                 title={
    //                   'Show ipdOperationPayment ' +
    //                   ipdOperationPayment.id +
    //                   ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editIpdOperationPayment({
    //                   id: ipdOperationPayment.id,
    //                 })}
    //                 title={'Edit ipdOperationPayment ' + ipdOperationPayment.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={
    //                   'Delete ipdOperationPayment ' + ipdOperationPayment.id
    //                 }
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(ipdOperationPayment.id)}
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

export default IpdOperationPaymentsList
