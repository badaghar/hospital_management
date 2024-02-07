import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdInvestigation/IpdInvestigationsCell'
import {
  checkboxInputTag,
  jsonTruncate,
  timeTag,
  truncate,
} from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState,useEffect } from 'react'
const DELETE_IPD_INVESTIGATION_MUTATION = gql`
  mutation DeleteIpdInvestigationMutation($id: Int!) {
    deleteIpdInvestigation(id: $id) {
      id
    }
  }
`

const IpdInvestigationsList = ({ ipdInvestigations,upload }) => {
  const [search_data, setSearch_data] = useState(ipdInvestigations)

  useEffect(()=>{
    setSearch_data(ipdInvestigations)

  },[ipdInvestigations])
  const [rows_count, setRows_count] = useState(ipdInvestigations.length )
  const [deleteIpdInvestigation] = useMutation(
    DELETE_IPD_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdInvestigation deleted')
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
      confirm('Are you sure you want to delete ipdInvestigation ' + id + '?')
    ) {
      deleteIpdInvestigation({ variables: { id } })
    }
  }
  const change = (search)=>{
    const search_val = search.target.value

    let filterData = ipdInvestigations.filter((val) => {
      return (
        val.ipd.patient.name
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
      accessor: 'ipd.patient.name',
    },
    // {
    //    headerClassName: 'text-left',
    //   Header:  'Phone no',
    //   accessor: 'phoneNo',
    // },

    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">

       {upload && <Link
          to={routes.editIpdInvestigation({
            id: original.id,
          })}
          title={'Edit ipdInvestigation ' + original.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          Upload Document
        </Link>}
        {
          !upload && <a href={original.url} className='rw-button rw-button-small' > Download </a>
        }


      </nav>

      ),
    },
  ]

  return (
    <>
                <SearchTable
    change={change}
    placeholder={"Search By Typing Distributer Name"}
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
    //         <th>Lab name</th>
    //         <th>Is waiting</th>
    //         <th>Test list</th>
    //         <th>Url</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Extra</th>
    //         <th>Ipd id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {ipdInvestigations.map((ipdInvestigation) => (
    //         <tr key={ipdInvestigation.id}>
    //           <td>{truncate(ipdInvestigation.id)}</td>
    //           <td>{truncate(ipdInvestigation.lab_name)}</td>
    //           <td>{checkboxInputTag(ipdInvestigation.isWaiting)}</td>
    //           <td>{jsonTruncate(ipdInvestigation.test_list)}</td>
    //           <td>{truncate(ipdInvestigation.url)}</td>
    //           <td>{timeTag(ipdInvestigation.created_at)}</td>
    //           <td>{timeTag(ipdInvestigation.updated_at)}</td>
    //           <td>{jsonTruncate(ipdInvestigation.extra)}</td>
    //           <td>{truncate(ipdInvestigation.ipdId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.ipdInvestigation({ id: ipdInvestigation.id })}
    //                 title={
    //                   'Show ipdInvestigation ' + ipdInvestigation.id + ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editIpdInvestigation({
    //                   id: ipdInvestigation.id,
    //                 })}
    //                 title={'Edit ipdInvestigation ' + ipdInvestigation.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Upload Document
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete ipdInvestigation ' + ipdInvestigation.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(ipdInvestigation.id)}
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

export default IpdInvestigationsList
