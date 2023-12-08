import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdHomoPrescriptionForm from 'src/components/IpdHomoPrescription/IpdHomoPrescriptionForm'

const CREATE_IPD_HOMO_PRESCRIPTION_MUTATION = gql`
  mutation CreateIpdHomoPrescriptionMutation(
    $input: CreateIpdHomoPrescriptionInput!
  ) {
    createIpdHomoPrescription(input: $input) {
      id
    }
  }
`

const NewIpdHomoPrescription = () => {
  const [createIpdHomoPrescription, { loading, error }] = useMutation(
    CREATE_IPD_HOMO_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdHomoPrescription created')
        navigate(routes.ipdHomoPrescriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdHomoPrescription({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New IpdHomoPrescription
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdHomoPrescriptionForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewIpdHomoPrescription
