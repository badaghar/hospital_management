import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdConsultationForm from 'src/components/IpdConsultation/IpdConsultationForm'

const CREATE_IPD_CONSULTATION_MUTATION = gql`
  mutation CreateIpdConsultationMutation($input: CreateIpdConsultationInput!) {
    createIpdConsultation(input: $input) {
      id
    }
  }
`

const NewIpdConsultation = () => {
  const [createIpdConsultation, { loading, error }] = useMutation(
    CREATE_IPD_CONSULTATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdConsultation created')
        navigate(routes.ipdConsultations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdConsultation({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IpdConsultation</h2>
      </header>
      <div className="rw-segment-main">
        <IpdConsultationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdConsultation
