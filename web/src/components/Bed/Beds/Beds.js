import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Bed/BedsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

const DELETE_BED_MUTATION = gql`
  mutation DeleteBedMutation($id: Int!) {
    deleteBed(id: $id) {
      id
    }
  }
`

const BedsList = ({ beds }) => {
  const [deleteBed] = useMutation(DELETE_BED_MUTATION, {
    onCompleted: () => {
      toast.success('Bed deleted')
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
    if (confirm('Are you sure you want to delete bed ' + id + '?')) {
      deleteBed({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Bed name</th>
            <th>Occupied</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Floor id</th>
            <th>Ipd id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {beds.map((bed) => (
            <tr key={bed.id}>
              <td>{truncate(bed.id)}</td>
              <td>{truncate(bed.bed_name)}</td>
              <td>{checkboxInputTag(bed.occupied)}</td>
              <td>{timeTag(bed.created_at)}</td>
              <td>{timeTag(bed.updated_at)}</td>
              <td>{truncate(bed.floorId)}</td>
              <td>{truncate(bed.ipdId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.bed({ id: bed.id })}
                    title={'Show bed ' + bed.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBed({ id: bed.id })}
                    title={'Edit bed ' + bed.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete bed ' + bed.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bed.id)}
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

export default BedsList
