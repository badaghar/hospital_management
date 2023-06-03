import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OperationForm from 'src/components/Operation/OperationForm'

export const QUERY = gql`
  query EditOperationById($id: Int!) {
    operation: operation(id: $id) {
      id
      operation_name
      date
      consultant_doctor
      remark
      result
      created_at
      updated_at
      ipdId
    }
  }
`
const UPDATE_OPERATION_MUTATION = gql`
  mutation UpdateOperationMutation($id: Int!, $input: UpdateOperationInput!) {
    updateOperation(id: $id, input: $input) {
      id
      operation_name
      date
      consultant_doctor
      remark
      result
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ operation }) => {
  const [updateOperation, { loading, error }] = useMutation(
    UPDATE_OPERATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Operation updated')
        navigate(routes.operations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateOperation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Operation {operation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OperationForm
          operation={operation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
