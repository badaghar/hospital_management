import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DossageForm from 'src/components/Dossage/DossageForm'

export const QUERY = gql`
  query EditDossageById($id: Int!) {
    dossage: dossage(id: $id) {
      id
      dose
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_DOSSAGE_MUTATION = gql`
  mutation UpdateDossageMutation($id: Int!, $input: UpdateDossageInput!) {
    updateDossage(id: $id, input: $input) {
      id
      dose
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

export const Success = ({ dossage }) => {
  const [updateDossage, { loading, error }] = useMutation(
    UPDATE_DOSSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Dossage updated')
        navigate(routes.dossages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateDossage({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Dossage {dossage?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DossageForm
          dossage={dossage}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
