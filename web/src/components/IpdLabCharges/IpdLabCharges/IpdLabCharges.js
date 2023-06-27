import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_IPD_LAB_CHARGES_MUTATION = gql`
  mutation DeleteIpdLabChargesMutation($id: Int!) {
    deleteIpdLabCharges(id: $id) {
      id
    }
  }
`

const IpdLabCharges = ({ ipdLabCharges }) => {
  const [deleteIpdLabCharges] = useMutation(DELETE_IPD_LAB_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('IpdLabCharges deleted')
      navigate(routes.ipdLabChargeses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipdLabCharges ' + id + '?')) {
      deleteIpdLabCharges({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdLabCharges {ipdLabCharges.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdLabCharges.id}</td>
            </tr>
            <tr>
              <th>Lab name</th>
              <td>{ipdLabCharges.lab_name}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdLabCharges.ipdId}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{ipdLabCharges.amount}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdLabCharges.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdLabCharges.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdLabCharges({ id: ipdLabCharges.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdLabCharges.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdLabCharges
