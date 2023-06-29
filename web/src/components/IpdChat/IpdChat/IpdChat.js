import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_IPD_CHAT_MUTATION = gql`
  mutation DeleteIpdChatMutation($id: Int!) {
    deleteIpdChat(id: $id) {
      id
    }
  }
`

const IpdChat = ({ ipdChat }) => {
  const [deleteIpdChat] = useMutation(DELETE_IPD_CHAT_MUTATION, {
    onCompleted: () => {
      toast.success('IpdChat deleted')
      navigate(routes.ipdChats())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipdChat ' + id + '?')) {
      deleteIpdChat({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdChat {ipdChat.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdChat.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdChat.created_at)}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdChat.ipdId}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(ipdChat.date)}</td>
            </tr>
            <tr>
              <th>Drug</th>
              <td>{ipdChat.drug}</td>
            </tr>
            <tr>
              <th>Dose</th>
              <td>{ipdChat.dose}</td>
            </tr>
            <tr>
              <th>Route</th>
              <td>{ipdChat.route}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdChat.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdChat({ id: ipdChat.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdChat.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdChat
