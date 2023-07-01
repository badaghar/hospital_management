import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdSummaryForm from 'src/components/IpdSummary/IpdSummaryForm'

export const QUERY = gql`
  query EditIpdSummaryById($id: Int!) {
    ipdSummary: ipdSummary(id: $id) {
      id
      ipdId
      summary
      created_at
      updated_at
    }
  }
`
const UPDATE_IPD_SUMMARY_MUTATION = gql`
  mutation UpdateIpdSummaryMutation($id: Int!, $input: UpdateIpdSummaryInput!) {
    updateIpdSummary(id: $id, input: $input) {
      id
      ipdId
      summary
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdSummary }) => {
  const [updateIpdSummary, { loading, error }] = useMutation(
    UPDATE_IPD_SUMMARY_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdSummary updated')
        navigate(routes.ipdSummaries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdSummary({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdSummary {ipdSummary?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdSummaryForm
          ipdSummary={ipdSummary}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
