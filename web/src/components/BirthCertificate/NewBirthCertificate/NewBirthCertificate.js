import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BirthCertificateForm from 'src/components/BirthCertificate/BirthCertificateForm'

const CREATE_BIRTH_CERTIFICATE_MUTATION = gql`
  mutation CreateBirthCertificateMutation(
    $input: CreateBirthCertificateInput!
  ) {
    createBirthCertificate(input: $input) {
      id
    }
  }
`

const NewBirthCertificate = () => {
  const [createBirthCertificate, { loading, error }] = useMutation(
    CREATE_BIRTH_CERTIFICATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BirthCertificate created')
        navigate(routes.birthCertificates())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createBirthCertificate({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New BirthCertificate
        </h2>
      </header>
      <div className="rw-segment-main">
        <BirthCertificateForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBirthCertificate
