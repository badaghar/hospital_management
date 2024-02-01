import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdInvestigationForm from 'src/components/IpdInvestigation/IpdInvestigationForm'

const CREATE_IPD_INVESTIGATION_MUTATION = gql`
  mutation CreateIpdInvestigationMutation(
    $input: CreateIpdInvestigationInput!
  ) {
    createIpdInvestigation(input: $input) {
      id
    }
  }
`

const NewIpdInvestigation = () => {
  const [createIpdInvestigation, { loading, error }] = useMutation(
    CREATE_IPD_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdInvestigation created')
        navigate(routes.ipdInvestigations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdInvestigation({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New IpdInvestigation
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdInvestigationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdInvestigation
