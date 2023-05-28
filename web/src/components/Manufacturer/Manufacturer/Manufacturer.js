import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_MANUFACTURER_MUTATION = gql`
  mutation DeleteManufacturerMutation($id: Int!) {
    deleteManufacturer(id: $id) {
      id
    }
  }
`

const Manufacturer = ({ manufacturer }) => {
  const [deleteManufacturer] = useMutation(DELETE_MANUFACTURER_MUTATION, {
    onCompleted: () => {
      toast.success('Manufacturer deleted')
      navigate(routes.manufacturers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete manufacturer ' + id + '?')) {
      deleteManufacturer({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Manufacturer {manufacturer.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{manufacturer.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{manufacturer.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(manufacturer.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(manufacturer.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editManufacturer({ id: manufacturer.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        {/* <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(manufacturer.id)}
        >
          Delete
        </button> */}
      </nav>
    </>
  )
}

export default Manufacturer
