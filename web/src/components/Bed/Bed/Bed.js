import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_BED_MUTATION = gql`
  mutation DeleteBedMutation($id: Int!) {
    deleteBed(id: $id) {
      id
    }
  }
`

const Bed = ({ bed }) => {
  const [deleteBed] = useMutation(DELETE_BED_MUTATION, {
    onCompleted: () => {
      toast.success('Bed deleted')
      navigate(routes.beds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bed ' + id + '?')) {
      deleteBed({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Bed {bed.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bed.id}</td>
            </tr>
            <tr>
              <th>Bed name</th>
              <td>{bed.bed_name}</td>
            </tr>
            <tr>
              <th>Occupied</th>
              <td>{checkboxInputTag(bed.occupied)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(bed.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(bed.updated_at)}</td>
            </tr>
            <tr>
              <th>Floor id</th>
              <td>{bed.floorId}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{bed.ipdId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBed({ id: bed.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bed.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Bed
