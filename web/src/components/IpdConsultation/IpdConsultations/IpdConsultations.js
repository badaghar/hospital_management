import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdConsultation/IpdConsultationsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_CONSULTATION_MUTATION = gql`
  mutation DeleteIpdConsultationMutation($id: Int!) {
    deleteIpdConsultation(id: $id) {
      id
    }
  }
`

const IpdConsultationsList = ({ ipdConsultations }) => {
  const [deleteIpdConsultation] = useMutation(
    DELETE_IPD_CONSULTATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdConsultation deleted')
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
      confirm('Are you sure you want to delete ipdConsultation ' + id + '?')
    ) {
      deleteIpdConsultation({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Consultation doctor</th>
            <th>Consultation type</th>
            <th>Amount</th>
            <th>Ipd id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdConsultations.map((ipdConsultation) => (
            <tr key={ipdConsultation.id}>
              <td>{truncate(ipdConsultation.id)}</td>
              <td>{truncate(ipdConsultation.consultation_doctor)}</td>
              <td>{truncate(ipdConsultation.consultation_type)}</td>
              <td>{truncate(ipdConsultation.amount)}</td>
              <td>{truncate(ipdConsultation.ipdId)}</td>
              <td>{timeTag(ipdConsultation.created_at)}</td>
              <td>{timeTag(ipdConsultation.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdConsultation({ id: ipdConsultation.id })}
                    title={
                      'Show ipdConsultation ' + ipdConsultation.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdConsultation({ id: ipdConsultation.id })}
                    title={'Edit ipdConsultation ' + ipdConsultation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ipdConsultation ' + ipdConsultation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdConsultation.id)}
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

export default IpdConsultationsList
