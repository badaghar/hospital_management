import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState ,useEffect} from 'react'

import { QUERY } from 'src/components/Manufacturer/ManufacturersCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_MANUFACTURER_MUTATION = gql`
  mutation DeleteManufacturerMutation($id: Int!) {
    deleteManufacturer(id: $id) {
      id
    }
  }
`

const ManufacturersList = ({ manufacturers }) => {
    const [search_data, setSearch_data] = useState(manufacturers)
  const [rows_count, setRows_count] = useState(manufacturers.length <= 5 ? 5 : 100)
  useEffect(()=>{
    setSearch_data(manufacturers)

  },[manufacturers])
  const [deleteManufacturer] = useMutation(DELETE_MANUFACTURER_MUTATION, {
    onCompleted: () => {
      toast.success('Manufacturer deleted')
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
    if (confirm('Are you sure you want to delete manufacturer ' + id + '?')) {
      deleteManufacturer({ variables: { id } })
    }
  }

  const change = (search)=>{
    const search_val = search.target.value

    let filterData = manufacturers.filter((val) => {
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
          to={routes.manufacturer({ id: original.id })}
          title={'Show manufacturer ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          Show
        </Link>
        <Link
          to={routes.editManufacturer({ id: original.id })}
          title={'Edit manufacturer ' + original.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        {/* <button
          type="button"
          title={'Delete manufacturer ' + manufacturer.id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(manufacturer.id)}
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
    placeholder={"Search By Typing Manufacturer Name"}
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
    //       {manufacturers.map((manufacturer) => (
    //         <tr key={manufacturer.id}>
    //           <td>{truncate(manufacturer.id)}</td>
    //           <td>{truncate(manufacturer.name)}</td>
    //           <td>{timeTag(manufacturer.created_at)}</td>
    //           <td>{timeTag(manufacturer.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.manufacturer({ id: manufacturer.id })}
    //                 title={'Show manufacturer ' + manufacturer.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editManufacturer({ id: manufacturer.id })}
    //                 title={'Edit manufacturer ' + manufacturer.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               {/* <button
    //                 type="button"
    //                 title={'Delete manufacturer ' + manufacturer.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(manufacturer.id)}
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

export default ManufacturersList
