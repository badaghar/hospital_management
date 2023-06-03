import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CHARGES_MUTATION = gql`
  mutation DeleteChargesMutation($id: Int!) {
    deleteCharges(id: $id) {
      id
    }
  }
`

const Charges = ({ charges }) => {
  const [deleteCharges] = useMutation(DELETE_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('Charges deleted')
      navigate(routes.chargeses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete charges ' + id + '?')) {
      deleteCharges({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Charges {charges.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{charges.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{charges.name}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{charges.amount}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(charges.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(charges.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCharges({ id: charges.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(charges.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Charges
