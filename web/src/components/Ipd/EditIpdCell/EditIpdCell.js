import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdForm from 'src/components/Ipd/IpdForm'

export const QUERY = gql`
  query EditIpdById($id: Int!) {
    ipd: ipd(id: $id) {
      id
      consultant_doctor
      date_of_admission
      created_at
      updated_at
      paid_amount
      discharge_date
      patientId
    }
  }
`
const UPDATE_IPD_MUTATION = gql`
  mutation UpdateIpdMutation($id: Int!, $input: UpdateIpdInput!) {
    updateIpd(id: $id, input: $input) {
      id
      consultant_doctor
      date_of_admission
      created_at
      updated_at
      paid_amount
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipd }) => {
  const [updateIpd, { loading, error }] = useMutation(UPDATE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Ipd updated')
      navigate(routes.ipds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateIpd({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Ipd {ipd?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <IpdForm ipd={ipd} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
