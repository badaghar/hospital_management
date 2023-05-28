import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Manufacturer/ManufacturersCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_MANUFACTURER_MUTATION = gql`
  mutation DeleteManufacturerMutation($id: Int!) {
    deleteManufacturer(id: $id) {
      id
    }
  }
`

const ManufacturersList = ({ manufacturers }) => {
  const [deleteManufacturer] = useMutation(DELETE_MANUFACTURER_MUTATION, {
    onCompleted: () => {
      toast.success('Manufacturer deleted')
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
    if (confirm('Are you sure you want to delete manufacturer ' + id + '?')) {
      deleteManufacturer({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => (
            <tr key={manufacturer.id}>
              <td>{truncate(manufacturer.id)}</td>
              <td>{truncate(manufacturer.name)}</td>
              <td>{timeTag(manufacturer.created_at)}</td>
              <td>{timeTag(manufacturer.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.manufacturer({ id: manufacturer.id })}
                    title={'Show manufacturer ' + manufacturer.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editManufacturer({ id: manufacturer.id })}
                    title={'Edit manufacturer ' + manufacturer.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  {/* <button
                    type="button"
                    title={'Delete manufacturer ' + manufacturer.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(manufacturer.id)}
                  >
                    Delete
                  </button> */}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManufacturersList
