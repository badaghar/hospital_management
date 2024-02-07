import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from "src/auth"
import { QUERY } from 'src/components/Patient/PatientsCell'
import { useEffect, useState } from 'react'
import { timeTag, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatientMutation($id: Int!) {
    deletePatient(id: $id) {
      id
    }
  }
`

const PatientsList = ({ patients }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const [search_data, setSearch_data] = useState(patients)
  const [rows_count, setRows_count] = useState(100)
  useEffect(() => {
    setSearch_data(patients)
  }, [patients])
  const [deletePatient] = useMutation(DELETE_PATIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Patient deleted')
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
    if (confirm('Are you sure you want to delete patient ' + id + '?')) {
      deletePatient({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = patients.filter((val) => {
      return (
        val.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase()) ||
        val.phone_no
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
      accessor: 'name',
    },
    {
      headerClassName: 'text-left',
      Header: 'Age',
      accessor: 'age',
    },
    {
      headerClassName: 'text-left',
      Header: 'Phone no',
      accessor: 'phone_no',
    },
    {
      headerClassName: 'text-left',
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      headerClassName: 'text-left',
      Header: 'Doctor',
      accessor: 'extra.drName.value',
    },
    {
      headerClassName: 'text-left',
      Header: 'Address',
      accessor: 'address',
    },


    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.patient({ id: original.id })}
            title={'Show patient ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          {(currentUser.roles == 'reciptionist' || currentUser.roles == 'doctor' || currentUser.roles == 'admin') && <Link
            to={routes.newIpd({ type: 'OPD', id: original.id })}
            title={'Show patient ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Add Opd
          </Link>}
          {(currentUser.roles == 'admin') &&
            <>
              <Link
                to={routes.editPatient({ id: original.id })}
                title={'Edit patient ' + original.id}
                className="rw-button rw-button-small rw-button-blue"
              >
                Edit
              </Link>
              <button
                type="button"
                title={'Delete patient ' + original.id}
                className="rw-button rw-button-small rw-button-red"
                onClick={() => onDeleteClick(original.id)}
              >
                Delete
              </button>
            </>
          }
        </nav>
      ),
    },
  ]

  return (
    <>
      <SearchTable
        change={change}
        placeholder={"Search By Typing Patient Name and Phone No."}
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
    //         <th>Age</th>
    //         <th>Phone no</th>
    //         <th>Gender</th>
    //         <th>Address</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {patients.map((patient) => (
    //         <tr key={patient.id}>
    //           <td>{truncate(patient.id)}</td>
    //           <td>{truncate(patient.name)}</td>
    //           <td>{truncate(patient.age)}</td>
    //           <td>{truncate(patient.phone_no)}</td>
    //           <td>{truncate(patient.gender)}</td>
    //           <td>{truncate(patient.address)}</td>
    //           <td>{timeTag(patient.created_at)}</td>
    //           <td>{timeTag(patient.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.patient({ id: patient.id })}
    //                 title={'Show patient ' + patient.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editPatient({ id: patient.id })}
    //                 title={'Edit patient ' + patient.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete patient ' + patient.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(patient.id)}
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

export default PatientsList
