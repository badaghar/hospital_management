import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdChat/IpdChatsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_CHAT_MUTATION = gql`
  mutation DeleteIpdChatMutation($id: Int!) {
    deleteIpdChat(id: $id) {
      id
    }
  }
`

const IpdChatsList = ({ ipdChats }) => {
  const [deleteIpdChat] = useMutation(DELETE_IPD_CHAT_MUTATION, {
    onCompleted: () => {
      toast.success('IpdChat deleted')
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
    if (confirm('Are you sure you want to delete ipdChat ' + id + '?')) {
      deleteIpdChat({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Ipd id</th>
            <th>Date</th>
            <th>Drug</th>
            <th>Dose</th>
            <th>Route</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdChats.map((ipdChat) => (
            <tr key={ipdChat.id}>
              <td>{truncate(ipdChat.id)}</td>
              <td>{timeTag(ipdChat.created_at)}</td>
              <td>{truncate(ipdChat.ipdId)}</td>
              <td>{timeTag(ipdChat.date)}</td>
              <td>{truncate(ipdChat.drug)}</td>
              <td>{truncate(ipdChat.dose)}</td>
              <td>{truncate(ipdChat.route)}</td>
              <td>{timeTag(ipdChat.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdChat({ id: ipdChat.id })}
                    title={'Show ipdChat ' + ipdChat.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdChat({ id: ipdChat.id })}
                    title={'Edit ipdChat ' + ipdChat.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ipdChat ' + ipdChat.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdChat.id)}
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

export default IpdChatsList
