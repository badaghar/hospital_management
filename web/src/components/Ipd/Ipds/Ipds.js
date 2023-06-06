import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Ipd/IpdsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_MUTATION = gql`
  mutation DeleteIpdMutation($id: Int!) {
    deleteIpd(id: $id) {
      id
    }
  }
`

const IpdsList = ({ ipds }) => {
  const [deleteIpd] = useMutation(DELETE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Ipd deleted')
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
    if (confirm('Are you sure you want to delete ipd ' + id + '?')) {
      deleteIpd({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Consultant doctor</th>
            <th>Date of admission</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Paid amount</th>
            <th>Patient id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipds.map((ipd) => (
            <tr key={ipd.id}>
              <td>{truncate(ipd.id)}</td>
              <td>{truncate(ipd.consultant_doctor)}</td>
              <td>{timeTag(ipd.date_of_admission)}</td>
              <td>{timeTag(ipd.created_at)}</td>
              <td>{timeTag(ipd.updated_at)}</td>
              <td>{truncate(ipd.paid_amount)}</td>
              <td>{truncate(ipd.patientId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipd({ id: ipd.id })}
                    title={'Show ipd ' + ipd.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  {/* <Link
                    to={routes.editIpd({ id: ipd.id })}
                    title={'Edit ipd ' + ipd.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link> */}
                  <button
                    type="button"
                    title={'Delete ipd ' + ipd.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipd.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IpdsList
