import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DurationForm from 'src/components/Duration/DurationForm'

export const QUERY = gql`
  query EditDurationById($id: Int!) {
    duration: duration(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_DURATION_MUTATION = gql`
  mutation UpdateDurationMutation($id: Int!, $input: UpdateDurationInput!) {
    updateDuration(id: $id, input: $input) {
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

export const Success = ({ duration }) => {
  const [updateDuration, { loading, error }] = useMutation(
    UPDATE_DURATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Duration updated')
        navigate(routes.durations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateDuration({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Duration {duration?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DurationForm
          duration={duration}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
