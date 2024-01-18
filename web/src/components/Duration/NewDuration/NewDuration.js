import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DurationForm from 'src/components/Duration/DurationForm'

const CREATE_DURATION_MUTATION = gql`
  mutation CreateDurationMutation($input: CreateDurationInput!) {
    createDuration(input: $input) {
      id
    }
  }
`

const NewDuration = () => {
  const [createDuration, { loading, error }] = useMutation(
    CREATE_DURATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Duration created')
        navigate(routes.durations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createDuration({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Duration</h2>
      </header>
      <div className="rw-segment-main">
        <DurationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDuration
