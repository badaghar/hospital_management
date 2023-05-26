import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DistributerForm from 'src/components/Distributer/DistributerForm'

export const QUERY = gql`
  query EditDistributerById($id: Int!) {
    distributer: distributer(id: $id) {
      id
      name
      phoneNo
      gstNo
      dlNo
      created_at
      updated_at
    }
  }
`
const UPDATE_DISTRIBUTER_MUTATION = gql`
  mutation UpdateDistributerMutation(
    $id: Int!
    $input: UpdateDistributerInput!
  ) {
    updateDistributer(id: $id, input: $input) {
      id
      name
      phoneNo
      gstNo
      dlNo
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ distributer }) => {
  const [updateDistributer, { loading, error }] = useMutation(
    UPDATE_DISTRIBUTER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Distributer updated')
        navigate(routes.distributers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateDistributer({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Distributer {distributer?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DistributerForm
          distributer={distributer}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
