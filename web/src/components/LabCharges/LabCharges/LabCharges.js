import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_LAB_CHARGES_MUTATION = gql`
  mutation DeleteLabChargesMutation($id: Int!) {
    deleteLabCharges(id: $id) {
      id
    }
  }
`

const LabCharges = ({ labCharges }) => {
  const [deleteLabCharges] = useMutation(DELETE_LAB_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('LabCharges deleted')
      navigate(routes.labChargeses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete labCharges ' + id + '?')) {
      deleteLabCharges({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            LabCharges {labCharges.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{labCharges.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{labCharges.name}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{labCharges.amount}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(labCharges.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(labCharges.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editLabCharges({ id: labCharges.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(labCharges.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default LabCharges
