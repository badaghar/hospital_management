import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OperationForm from 'src/components/Operation/OperationForm'

const CREATE_OPERATION_MUTATION = gql`
  mutation CreateOperationMutation($input: CreateOperationInput!) {
    createOperation(input: $input) {
      id
    }
  }
`

const NewOperation = () => {
  const [createOperation, { loading, error }] = useMutation(
    CREATE_OPERATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Operation created')
        navigate(routes.operations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createOperation({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Operation</h2>
      </header>
      <div className="rw-segment-main">
        <OperationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewOperation
