import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Charges/ChargesesCell'
import { timeTag, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState } from 'react'

const DELETE_CHARGES_MUTATION = gql`
  mutation DeleteChargesMutation($id: Int!) {
    deleteCharges(id: $id) {
      id
    }
  }
`

const ChargesesList = ({ chargeses }) => {
  const [search_data, setSearch_data] = useState(chargeses)
  const [rows_count, setRows_count] = useState(chargeses.length <= 5 ? 5 : 10)
  const [deleteCharges] = useMutation(DELETE_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('Charges deleted')
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
    if (confirm('Are you sure you want to delete charges ' + id + '?')) {
      deleteCharges({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = chargeses.filter((val) => {
      return (
        val.name
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
      Cell: ({ index }) => (
        index + 1
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Name',
      accessor: 'name',
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
            to={routes.charges({ id: original.id })}
            title={'Show charges ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          <Link
            to={routes.editCharges({ id: original.id })}
            title={'Edit charges ' + original.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            title={'Delete charges ' + original.id}
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
        placeholder={"Search By Typing Charges Name"}
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
    //         <th>Name</th>
    //         <th>Amount</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {chargeses.map((charges) => (
    //         <tr key={charges.id}>
    //           <td>{truncate(charges.id)}</td>
    //           <td>{truncate(charges.name)}</td>
    //           <td>{truncate(charges.amount)}</td>
    //           <td>{timeTag(charges.created_at)}</td>
    //           <td>{timeTag(charges.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.charges({ id: charges.id })}
    //                 title={'Show charges ' + charges.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editCharges({ id: charges.id })}
    //                 title={'Edit charges ' + charges.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete charges ' + charges.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(charges.id)}
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

export default ChargesesList
