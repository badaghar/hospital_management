import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LabPriceListForm from 'src/components/LabPriceList/LabPriceListForm'

export const QUERY = gql`
  query EditLabPriceListById($id: Int!) {
    labPriceList: labPriceList(id: $id) {
      id
      test_list
      created_at
      updated_at
      extra
      labId
    }
    labs{
      id
      name
    }
  }
`
const UPDATE_LAB_PRICE_LIST_MUTATION = gql`
  mutation UpdateLabPriceListMutation(
    $id: Int!
    $input: UpdateLabPriceListInput!
  ) {
    updateLabPriceList(id: $id, input: $input) {
      id
      test_list
      created_at
      updated_at
      extra
      labId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ labPriceList,labs }) => {
  const [updateLabPriceList, { loading, error }] = useMutation(
    UPDATE_LAB_PRICE_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('LabPriceList updated')
        navigate(routes.labPriceLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateLabPriceList({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit LabPriceList {labPriceList?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <LabPriceListForm
          labPriceList={labPriceList}
          onSave={onSave}
          error={error}
          loading={loading}
          labs={labs}
        />
      </div>
    </div>
  )
}
