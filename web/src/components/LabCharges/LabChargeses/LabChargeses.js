import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/LabCharges/LabChargesesCell'
import { timeTag, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState } from 'react'


const DELETE_LAB_CHARGES_MUTATION = gql`
  mutation DeleteLabChargesMutation($id: Int!) {
    deleteLabCharges(id: $id) {
      id
    }
  }
`

const LabChargesesList = ({ labChargeses }) => {
  const [search_data, setSearch_data] = useState(labChargeses)
  const [rows_count, setRows_count] = useState(labChargeses.length <= 5 ? 5 : 1000)
  const [deleteLabCharges] = useMutation(DELETE_LAB_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('LabCharges deleted')
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
    if (confirm('Are you sure you want to delete labCharges ' + id + '?')) {
      deleteLabCharges({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = labChargeses.filter((val) => {
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
       headerClassName: 'text-left',
      Header:  'SL. No',
            Cell: ({index}) => (
            index+1
        )
    },
    {
       headerClassName: 'text-left',
      Header:  'Name',
      accessor: 'name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Amount',
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
                    to={routes.labCharges({ id: original.id })}
                    title={'Show labCharges ' + original.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLabCharges({ id: original.id })}
                    title={'Edit labCharges ' + original.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete labCharges ' + original.id}
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
placeholder={"Search By Typing Lab Name"}
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
    //       {labChargeses.map((labCharges) => (
    //         <tr key={labCharges.id}>
    //           <td>{truncate(labCharges.id)}</td>
    //           <td>{truncate(labCharges.name)}</td>
    //           <td>{truncate(labCharges.amount)}</td>
    //           <td>{timeTag(labCharges.created_at)}</td>
    //           <td>{timeTag(labCharges.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.labCharges({ id: labCharges.id })}
    //                 title={'Show labCharges ' + labCharges.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editLabCharges({ id: labCharges.id })}
    //                 title={'Edit labCharges ' + labCharges.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete labCharges ' + labCharges.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(labCharges.id)}
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

export default LabChargesesList
