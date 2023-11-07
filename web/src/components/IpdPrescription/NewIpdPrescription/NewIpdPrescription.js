import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdPrescriptionForm from 'src/components/IpdPrescription/IpdPrescriptionForm'

const CREATE_IPD_PRESCRIPTION_MUTATION = gql`
  mutation CreateIpdPrescriptionMutation($input: CreateIpdPrescriptionInput!) {
    createIpdPrescription(input: $input) {
      id
    }
  }
`

const NewIpdPrescription = () => {
  const [createIpdPrescription, { loading, error }] = useMutation(
    CREATE_IPD_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPrescription created')
        navigate(routes.ipdPrescriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdPrescription({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IpdPrescription</h2>
      </header>
      <div className="rw-segment-main">
        <IpdPrescriptionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdPrescription
