import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdCharges/IpdChargesesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_CHARGES_MUTATION = gql`
  mutation DeleteIpdChargesMutation($id: Int!) {
    deleteIpdCharges(id: $id) {
      id
    }
  }
`

const IpdChargesesList = ({ ipdChargeses }) => {
  const [deleteIpdCharges] = useMutation(DELETE_IPD_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('IpdCharges deleted')
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
    if (confirm('Are you sure you want to delete ipdCharges ' + id + '?')) {
      deleteIpdCharges({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Charge type</th>
            <th>Charge</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Ipd id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdChargeses.map((ipdCharges) => (
            <tr key={ipdCharges.id}>
              <td>{truncate(ipdCharges.id)}</td>
              <td>{truncate(ipdCharges.charge_type)}</td>
              <td>{truncate(ipdCharges.charge)}</td>
              <td>{truncate(ipdCharges.quantity)}</td>
              <td>{truncate(ipdCharges.total)}</td>
              <td>{timeTag(ipdCharges.created_at)}</td>
              <td>{timeTag(ipdCharges.updated_at)}</td>
              <td>{truncate(ipdCharges.ipdId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdCharges({ id: ipdCharges.id })}
                    title={'Show ipdCharges ' + ipdCharges.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdCharges({ id: ipdCharges.id })}
                    title={'Edit ipdCharges ' + ipdCharges.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ipdCharges ' + ipdCharges.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdCharges.id)}
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

export default IpdChargesesList
