import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DistributerForm from 'src/components/Distributer/DistributerForm'

const CREATE_DISTRIBUTER_MUTATION = gql`
  mutation CreateDistributerMutation($input: CreateDistributerInput!) {
    createDistributer(input: $input) {
      id
    }
  }
`

const NewDistributer = () => {
  const [createDistributer, { loading, error }] = useMutation(
    CREATE_DISTRIBUTER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Distributer created')
        navigate(routes.distributers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createDistributer({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Distributer</h2>
      </header>
      <div className="rw-segment-main">
        <DistributerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDistributer
