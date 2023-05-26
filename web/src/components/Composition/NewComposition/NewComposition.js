import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompositionForm from 'src/components/Composition/CompositionForm'

const CREATE_COMPOSITION_MUTATION = gql`
  mutation CreateCompositionMutation($input: CreateCompositionInput!) {
    createComposition(input: $input) {
      id
    }
  }
`

const NewComposition = () => {
  const [createComposition, { loading, error }] = useMutation(
    CREATE_COMPOSITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Composition created')
        navigate(routes.compositions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createComposition({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Composition</h2>
      </header>
      <div className="rw-segment-main">
        <CompositionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewComposition
