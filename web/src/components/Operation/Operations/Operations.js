import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Operation/OperationsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState } from 'react'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_OPERATION_MUTATION = gql`
  mutation DeleteOperationMutation($id: Int!) {
    deleteOperation(id: $id) {
      id
    }
  }
`

const OperationsList = ({ operations }) => {
  const [search_data, setSearch_data] = useState(operations)
  const [rows_count, setRows_count] = useState(operations.length <= 5 ? 5 : 100)
  const [deleteOperation] = useMutation(DELETE_OPERATION_MUTATION, {
    onCompleted: () => {
      toast.success('Operation deleted')
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
    if (confirm('Are you sure you want to delete operation ' + id + '?')) {
      deleteOperation({ variables: { id } })
    }
  }
  const change = (search)=>{
    const search_val = search.target.value

    let filterData = operations.filter((val) => {
      return (
        val.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 100)
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
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
                       <nav className="rw-table-actions">
                  <Link
                    to={routes.operation({ id: original.id })}
                    title={'Show operation ' + original.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOperation({ id: original.id })}
                    title={'Edit operation ' + original.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete operation ' + original.id}
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
    placeholder={"Search By Typing Operation Name"}
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
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {operations.map((operation) => (
    //         <tr key={operation.id}>
    //           <td>{truncate(operation.id)}</td>
    //           <td>{truncate(operation.name)}</td>
    //           <td>{timeTag(operation.created_at)}</td>
    //           <td>{timeTag(operation.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.operation({ id: operation.id })}
    //                 title={'Show operation ' + operation.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editOperation({ id: operation.id })}
    //                 title={'Edit operation ' + operation.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete operation ' + operation.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(operation.id)}
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

export default OperationsList
