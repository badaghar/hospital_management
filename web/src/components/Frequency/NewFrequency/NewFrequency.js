import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FrequencyForm from 'src/components/Frequency/FrequencyForm'

const CREATE_FREQUENCY_MUTATION = gql`
  mutation CreateFrequencyMutation($input: CreateFrequencyInput!) {
    createFrequency(input: $input) {
      id
    }
  }
`

const NewFrequency = () => {
  const [createFrequency, { loading, error }] = useMutation(
    CREATE_FREQUENCY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Frequency created')
        navigate(routes.frequencies())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createFrequency({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Frequency</h2>
      </header>
      <div className="rw-segment-main">
        <FrequencyForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFrequency
