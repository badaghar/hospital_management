import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/LabPriceList/LabPriceListsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_LAB_PRICE_LIST_MUTATION = gql`
  mutation DeleteLabPriceListMutation($id: Int!) {
    deleteLabPriceList(id: $id) {
      id
    }
  }
`

const LabPriceListsList = ({ labPriceLists }) => {
  const [deleteLabPriceList] = useMutation(DELETE_LAB_PRICE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('LabPriceList deleted')
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
    if (confirm('Are you sure you want to delete labPriceList ' + id + '?')) {
      deleteLabPriceList({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            {/* <th>Test list</th> */}
            <th>Lab</th>
            <th>Created at</th>
            <th>Updated at</th>
            {/* <th>Extra</th> */}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {labPriceLists.map((labPriceList) => (
            <tr key={labPriceList.id}>
              <td>{truncate(labPriceList.id)}</td>
              <td>{truncate(labPriceList.lab.name)}</td>
              {/* <td>{jsonTruncate(labPriceList.test_list)}</td> */}
              <td>{timeTag(labPriceList.created_at)}</td>
              <td>{timeTag(labPriceList.updated_at)}</td>
              {/* <td>{jsonTruncate(labPriceList.extra)}</td> */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.labPriceList({ id: labPriceList.id })}
                    title={'Show labPriceList ' + labPriceList.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLabPriceList({ id: labPriceList.id })}
                    title={'Edit labPriceList ' + labPriceList.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete labPriceList ' + labPriceList.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(labPriceList.id)}
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

export default LabPriceListsList
