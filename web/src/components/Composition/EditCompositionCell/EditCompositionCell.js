import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompositionForm from 'src/components/Composition/CompositionForm'

export const QUERY = gql`
  query EditCompositionById($id: Int!) {
    composition: composition(id: $id) {
      id
      name
      created_at
      updated_at
    }
  }
`
const UPDATE_COMPOSITION_MUTATION = gql`
  mutation UpdateCompositionMutation(
    $id: Int!
    $input: UpdateCompositionInput!
  ) {
    updateComposition(id: $id, input: $input) {
      id
      name
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ composition }) => {
  const [updateComposition, { loading, error }] = useMutation(
    UPDATE_COMPOSITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Composition updated')
        navigate(routes.compositions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateComposition({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Composition {composition?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CompositionForm
          composition={composition}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
