import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_LAB_PRICE_LIST_MUTATION = gql`
  mutation DeleteLabPriceListMutation($id: Int!) {
    deleteLabPriceList(id: $id) {
      id
    }
  }
`

const LabPriceList = ({ labPriceList }) => {
  const [deleteLabPriceList] = useMutation(DELETE_LAB_PRICE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('LabPriceList deleted')
      navigate(routes.labPriceLists())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete labPriceList ' + id + '?')) {
      deleteLabPriceList({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            LabPriceList {labPriceList.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{labPriceList.id}</td>
            </tr>
            <tr>
              <th>Test list</th>
              <td>{jsonDisplay(labPriceList.test_list)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(labPriceList.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(labPriceList.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(labPriceList.extra)}</td>
            </tr>
            <tr>
              <th>Lab id</th>
              <td>{labPriceList.labId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editLabPriceList({ id: labPriceList.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(labPriceList.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default LabPriceList
