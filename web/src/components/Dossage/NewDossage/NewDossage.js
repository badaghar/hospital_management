import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DossageForm from 'src/components/Dossage/DossageForm'

const CREATE_DOSSAGE_MUTATION = gql`
  mutation CreateDossageMutation($input: CreateDossageInput!) {
    createDossage(input: $input) {
      id
    }
  }
`

const NewDossage = () => {
  const [createDossage, { loading, error }] = useMutation(
    CREATE_DOSSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Dossage created')
        navigate(routes.dossages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createDossage({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Dossage</h2>
      </header>
      <div className="rw-segment-main">
        <DossageForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDossage
