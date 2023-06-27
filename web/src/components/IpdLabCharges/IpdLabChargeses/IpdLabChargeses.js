import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdLabCharges/IpdLabChargesesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_LAB_CHARGES_MUTATION = gql`
  mutation DeleteIpdLabChargesMutation($id: Int!) {
    deleteIpdLabCharges(id: $id) {
      id
    }
  }
`

const IpdLabChargesesList = ({ ipdLabChargeses }) => {
  const [deleteIpdLabCharges] = useMutation(DELETE_IPD_LAB_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('IpdLabCharges deleted')
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
    if (confirm('Are you sure you want to delete ipdLabCharges ' + id + '?')) {
      deleteIpdLabCharges({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Lab name</th>
            <th>Ipd id</th>
            <th>Amount</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdLabChargeses.map((ipdLabCharges) => (
            <tr key={ipdLabCharges.id}>
              <td>{truncate(ipdLabCharges.id)}</td>
              <td>{truncate(ipdLabCharges.lab_name)}</td>
              <td>{truncate(ipdLabCharges.ipdId)}</td>
              <td>{truncate(ipdLabCharges.amount)}</td>
              <td>{timeTag(ipdLabCharges.created_at)}</td>
              <td>{timeTag(ipdLabCharges.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdLabCharges({ id: ipdLabCharges.id })}
                    title={'Show ipdLabCharges ' + ipdLabCharges.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdLabCharges({ id: ipdLabCharges.id })}
                    title={'Edit ipdLabCharges ' + ipdLabCharges.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ipdLabCharges ' + ipdLabCharges.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdLabCharges.id)}
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

export default IpdLabChargesesList
