import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/LabCharges/LabChargesesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_LAB_CHARGES_MUTATION = gql`
  mutation DeleteLabChargesMutation($id: Int!) {
    deleteLabCharges(id: $id) {
      id
    }
  }
`

const LabChargesesList = ({ labChargeses }) => {
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

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {labChargeses.map((labCharges) => (
            <tr key={labCharges.id}>
              <td>{truncate(labCharges.id)}</td>
              <td>{truncate(labCharges.name)}</td>
              <td>{truncate(labCharges.amount)}</td>
              <td>{timeTag(labCharges.created_at)}</td>
              <td>{timeTag(labCharges.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.labCharges({ id: labCharges.id })}
                    title={'Show labCharges ' + labCharges.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLabCharges({ id: labCharges.id })}
                    title={'Edit labCharges ' + labCharges.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete labCharges ' + labCharges.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(labCharges.id)}
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

export default LabChargesesList
