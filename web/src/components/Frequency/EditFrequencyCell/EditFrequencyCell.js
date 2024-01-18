import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FrequencyForm from 'src/components/Frequency/FrequencyForm'

export const QUERY = gql`
  query EditFrequencyById($id: Int!) {
    frequency: frequency(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_FREQUENCY_MUTATION = gql`
  mutation UpdateFrequencyMutation($id: Int!, $input: UpdateFrequencyInput!) {
    updateFrequency(id: $id, input: $input) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ frequency }) => {
  const [updateFrequency, { loading, error }] = useMutation(
    UPDATE_FREQUENCY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Frequency updated')
        navigate(routes.frequencies())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateFrequency({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Frequency {frequency?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FrequencyForm
          frequency={frequency}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
