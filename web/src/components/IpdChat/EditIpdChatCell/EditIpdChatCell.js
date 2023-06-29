import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdChatForm from 'src/components/IpdChat/IpdChatForm'

export const QUERY = gql`
  query EditIpdChatById($id: Int!) {
    ipdChat: ipdChat(id: $id) {
      id
      created_at
      ipdId
      date
      drug
      dose
      route
      updated_at
    }
  }
`
const UPDATE_IPD_CHAT_MUTATION = gql`
  mutation UpdateIpdChatMutation($id: Int!, $input: UpdateIpdChatInput!) {
    updateIpdChat(id: $id, input: $input) {
      id
      created_at
      ipdId
      date
      drug
      dose
      route
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdChat }) => {
  const [updateIpdChat, { loading, error }] = useMutation(
    UPDATE_IPD_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdChat updated')
        navigate(routes.ipdChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdChat({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdChat {ipdChat?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdChatForm
          ipdChat={ipdChat}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
