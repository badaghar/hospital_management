import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { QUERY } from 'src/components/BirthCertificate/BirthCertificatesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_BIRTH_CERTIFICATE_MUTATION = gql`
  mutation DeleteBirthCertificateMutation($id: Int!) {
    deleteBirthCertificate(id: $id) {
      id
    }
  }
`

const BirthCertificatesList = ({ birthCertificates }) => {
  const [search_data, setSearch_data] = useState(birthCertificates)

  useEffect(() => {
    setSearch_data(birthCertificates)

  }, [birthCertificates])
  // console.log(birthCertificates)
  const [rows_count, setRows_count] = useState(birthCertificates.length )
  const [deleteBirthCertificate] = useMutation(
    DELETE_BIRTH_CERTIFICATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BirthCertificate deleted')
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
      confirm('Are you sure you want to delete birthCertificate ' + id + '?')
    ) {
      deleteBirthCertificate({ variables: { id } })
    }
  }


  function getPDF(id) {
    return axios.get(
      `/.redwood/functions/downloadCertificate?id=` +
      id,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    )
  }
  const printPDF = (id) => {
    return getPDF(id) // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        var blobURL = URL.createObjectURL(blob)
        var iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
        toast.success('Download Complete')
      })
      .catch((err) => {
        toast.error('something wrong happened try again')
        console.log(err)
      })
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = birthCertificates.filter((val) => {
      return (
        val.name
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
      Header: 'SL. No',
      // accessor: 'id',
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
      Header: `Date`,
      accessor: 'birth_date',
    },
    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <button
            type="button"
            title={'Delete birthCertificate ' + original.id}
            className="rw-button rw-button-small rw-button-red"
            onClick={() => printPDF(original.id)}
          >
            Print
          </button>
          <Link
            to={routes.editBirthCertificate({
              id: original.id,
            })}
            title={'Edit birthCertificate ' + original.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            title={'Delete birthCertificate ' + original.id}
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
        placeholder={"Search By Typing Patient Name"}
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
    //         <th>Birth date</th>
    //         <th>Weight</th>
    //         <th>Type</th>
    //         <th>Extra</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {birthCertificates.map((birthCertificate) => (
    //         <tr key={birthCertificate.id}>
    //           <td>{truncate(birthCertificate.id)}</td>
    //           <td>{truncate(birthCertificate.name)}</td>
    //           <td>{timeTag(birthCertificate.birth_date)}</td>
    //           <td>{truncate(birthCertificate.weight)}</td>
    //           <td>{truncate(birthCertificate.type)}</td>
    //           <td>{jsonTruncate(birthCertificate.extra)}</td>
    //           <td>{timeTag(birthCertificate.created_at)}</td>
    //           <td>{timeTag(birthCertificate.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               {/* <Link
    //                 to={routes.birthCertificate({ id: birthCertificate.id })}
    //                 title={
    //                   'Show birthCertificate ' + birthCertificate.id + ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link> */}
    //                        <button
    //                 type="button"
    //                 title={'Delete birthCertificate ' + birthCertificate.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => printPDF(birthCertificate.id)}
    //               >
    //                 Print
    //               </button>
    //               <Link
    //                 to={routes.editBirthCertificate({
    //                   id: birthCertificate.id,
    //                 })}
    //                 title={'Edit birthCertificate ' + birthCertificate.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete birthCertificate ' + birthCertificate.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(birthCertificate.id)}
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

export default BirthCertificatesList
