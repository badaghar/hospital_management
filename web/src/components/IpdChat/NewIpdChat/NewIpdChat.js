import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdChatForm from 'src/components/IpdChat/IpdChatForm'

const CREATE_IPD_CHAT_MUTATION = gql`
  mutation CreateIpdChatMutation($input: CreateIpdChatInput!) {
    createIpdChat(input: $input) {
      id
    }
  }
`

const NewIpdChat = () => {
  const [createIpdChat, { loading, error }] = useMutation(
    CREATE_IPD_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdChat created')
        navigate(routes.ipdChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdChat({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IpdChat</h2>
      </header>
      <div className="rw-segment-main">
        <IpdChatForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdChat
