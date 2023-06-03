import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OpdForm from 'src/components/Opd/OpdForm'

export const QUERY = gql`
  query EditOpdById($id: Int!) {
    opd: opd(id: $id) {
      id
      consultant_doctor
      charges
      paymentMode
      amount
      created_at
      updated_at
      patientId
    }
  }
`
const UPDATE_OPD_MUTATION = gql`
  mutation UpdateOpdMutation($id: Int!, $input: UpdateOpdInput!) {
    updateOpd(id: $id, input: $input) {
      id
      consultant_doctor
      charges
      paymentMode
      amount
      created_at
      updated_at
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ opd }) => {
  const [updateOpd, { loading, error }] = useMutation(UPDATE_OPD_MUTATION, {
    onCompleted: () => {
      toast.success('Opd updated')
      navigate(routes.opds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateOpd({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Opd {opd?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <OpdForm opd={opd} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
