import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/Composition/CompositionsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_COMPOSITION_MUTATION = gql`
  mutation DeleteCompositionMutation($id: Int!) {
    deleteComposition(id: $id) {
      id
    }
  }
`

const CompositionsList = ({ compositions }) => {
  const [search_data, setSearch_data] = useState(compositions)
  const [rows_count, setRows_count] = useState(compositions.length <= 5 ? 5 : 10)
  const [deleteComposition] = useMutation(DELETE_COMPOSITION_MUTATION, {
    onCompleted: () => {
      toast.success('Composition deleted')
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
    if (confirm('Are you sure you want to delete composition ' + id + '?')) {
      deleteComposition({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = compositions.filter((val) => {
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
      Header:  'SL. No',
      // accessor: 'id',
            Cell: ({index}) => (
            index+1
        )
    },
    {
       headerClassName: 'text-left',
      Header:  'Name',
      accessor: 'name',
    },
    // {
    //    headerClassName: 'text-left',
    //   Header:  'Created At',
    //   accessor: 'created_at',
    //   Cell: ({ original }) => (
    //       timeTag(original.created_at)
    //     )
    // },
    // {
    //    headerClassName: 'text-left',
    //   Header:  'Updated At',
    //   accessor: 'updated_at',
    //   Cell: ({ original }) => (
    //       timeTag(original.updated_at)
    //     )
    // },

    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
        <Link
          to={routes.composition({ id: original.id })}
          title={'Show composition ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          Show
        </Link>
        <Link
          to={routes.editComposition({ id: original.id })}
          title={'Edit composition ' + original.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        {/* <button
          type="button"
          title={'Delete composition ' + composition.id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(composition.id)}
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
    //         <th>Name</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {compositions.map((composition) => (
    //         <tr key={composition.id}>
    //           <td>{truncate(composition.id)}</td>
    //           <td>{truncate(composition.name)}</td>
    //           <td>{timeTag(composition.created_at)}</td>
    //           <td>{timeTag(composition.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.composition({ id: composition.id })}
    //                 title={'Show composition ' + composition.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editComposition({ id: composition.id })}
    //                 title={'Edit composition ' + composition.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               {/* <button
    //                 type="button"
    //                 title={'Delete composition ' + composition.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(composition.id)}
    //               >
    //                 Delete
    //               </button> */}
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default CompositionsList
