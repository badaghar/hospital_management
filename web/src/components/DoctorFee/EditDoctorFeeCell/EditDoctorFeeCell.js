import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DoctorFeeForm from 'src/components/DoctorFee/DoctorFeeForm'

export const QUERY = gql`
  query EditDoctorFeeById($id: Int!) {
    doctorFee: doctorFee(id: $id) {
      id
      type
      amount
      userId
      created_at
      updated_at
    }
    users{
      id
      name
      email
      roles
    }
  }
`
const UPDATE_DOCTOR_FEE_MUTATION = gql`
  mutation UpdateDoctorFeeMutation($id: Int!, $input: UpdateDoctorFeeInput!) {
    updateDoctorFee(id: $id, input: $input) {
      id
      type
      amount
      userId
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ doctorFee,users }) => {
  const [updateDoctorFee, { loading, error }] = useMutation(
    UPDATE_DOCTOR_FEE_MUTATION,
    {
      onCompleted: () => {
        toast.success('DoctorFee updated')
        navigate(routes.doctorFees())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateDoctorFee({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit DoctorFee {doctorFee?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DoctorFeeForm
        users={users}
          doctorFee={doctorFee}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
