import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BirthCertificateForm from 'src/components/BirthCertificate/BirthCertificateForm'

export const QUERY = gql`
  query EditBirthCertificateById($id: Int!) {
    birthCertificate: birthCertificate(id: $id) {
      id
      name
      birth_date
      weight
      type
      extra
      created_at
      updated_at
    }
  }
`
const UPDATE_BIRTH_CERTIFICATE_MUTATION = gql`
  mutation UpdateBirthCertificateMutation(
    $id: Int!
    $input: UpdateBirthCertificateInput!
  ) {
    updateBirthCertificate(id: $id, input: $input) {
      id
      name
      birth_date
      weight
      type
      extra
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ birthCertificate }) => {
  const [updateBirthCertificate, { loading, error }] = useMutation(
    UPDATE_BIRTH_CERTIFICATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Certificate updated')
        navigate(routes.birthCertificates())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateBirthCertificate({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Certificate {birthCertificate?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BirthCertificateForm
          birthCertificate={birthCertificate}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
