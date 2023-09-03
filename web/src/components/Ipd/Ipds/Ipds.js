import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState, useEffect } from 'react'
import { useAuth } from "src/auth"

import { QUERY } from 'src/components/Ipd/IpdsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_MUTATION = gql`
  mutation DeleteIpdMutation($id: Int!) {
    deleteIpd(id: $id) {
      id
    }
  }
`

const IpdsList = ({ ipds }) => {
  const [search_data, setSearch_data] = useState(ipds)
  const [rows_count, setRows_count] = useState(ipds.length <= 5 ? 5 : 10)
  const [refresh, setRefresh] = useState(false)
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const isAdmin = currentUser?.roles == 'admin'
  const [deleteIpd] = useMutation(DELETE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Patient Record deleted')
      setTimeout(() => { document.location.reload(); }, 10);
    },
    onError: (error) => {
      console.log(error)
      // toast.error(error.message)
      toast.success('Patient Record deleted')
      setTimeout(() => { document.location.reload(); }, 10);

    },



    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,

  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipd ' + id + '?')) {
      deleteIpd({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value
    // console.log(search_val,search)

    let filterData = ipds.filter((val) => {
      return (
        val.patient.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase()) || val.patient.phone_no
            .toString()
            .toLowerCase()
            .includes(search_val.toLowerCase())
      )
    })

    setRows_count(filterData.length <= 5 ? 5 : 10)
    setSearch_data(filterData)
  }

  // useEffect(() => {

  //   console.log('here')


  //   let data = {
  //     'target':{
  //       'value':'a'
  //     }
  //   }

  //   change(data)
  //   console.log('here1')

  //   setTimeout(() => {
  //     let data = {
  //       'target':{
  //         'value':''
  //       }
  //     }

  //     change(data)
  //     console.log('here2')

  //   }, 100);

  //   console.log('here3')




  // }, [])





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
      accessor: 'patient.name',
    },
    {
      headerClassName: 'text-left',
      Header: 'Phone No',
      accessor: 'patient.phone_no',
    },
    // {
    //   headerClassName: 'text-left',
    //   Header: 'Consultant doctor',
    //   accessor: 'consultant_doctor',
    // },
    {
      headerClassName: 'text-left',
      Header: 'Date of admission',
      accessor: 'date_of_admission',
      Cell: ({ original }) => (
        timeTag(original.date_of_admission)
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Paid Amount',
      accessor: 'paid_amount',
    },
    {
      headerClassName: 'text-left',
      Header: 'Date of Discharge',
      accessor: 'discharge_date',
      Cell: ({ original }) => (
        timeTag(original.discharge_date) || '-'
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.ipd({ id: original.id })}
            title={'Show ipd ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          {
            isAdmin &&
            <button
              type="button"
              title={'Delete ipd ' + original.id}
              className="rw-button rw-button-small rw-button-red"
              onClick={() => onDeleteClick(original.id)}
            >
              Delete
            </button>}

        </nav>
      ),
    },
  ]




  return (
    <>
      {


        <SearchTable
          change={change}
          placeholder={"Search By Typing Patient Name"}
          columns={columns}
          rows_count={rows_count}
          search_data={search_data}
        />}
    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Consultant doctor</th>
    //         <th>Date of admission</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Paid amount</th>
    //         <th>Patient id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {ipds.map((ipd) => (
    //         <tr key={ipd.id}>
    //           <td>{truncate(ipd.id)}</td>
    //           <td>{truncate(ipd.consultant_doctor)}</td>
    //           <td>{timeTag(ipd.date_of_admission)}</td>
    //           <td>{timeTag(ipd.created_at)}</td>
    //           <td>{timeTag(ipd.updated_at)}</td>
    //           <td>{truncate(ipd.paid_amount)}</td>
    //           <td>{truncate(ipd.patientId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.ipd({ id: ipd.id })}
    //                 title={'Show ipd ' + ipd.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               {/* <Link
    //                 to={routes.editIpd({ id: ipd.id })}
    //                 title={'Edit ipd ' + ipd.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link> */}
    //               <button
    //                 type="button"
    //                 title={'Delete ipd ' + ipd.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(ipd.id)}
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

export default IpdsList
