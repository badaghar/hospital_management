import { Link, routes } from '@redwoodjs/router'

import IpdInvestigations from 'src/components/IpdInvestigation/IpdInvestigations'

export const QUERY = gql`
  query FindIpdInvestigations($lab: String!) {
    ipdInvestigations(lab: $lab) {
      id
      lab_name
      isWaiting
      test_list
      url
      created_at
      updated_at
      extra
      ipdId
      ipd{
        patient{
          name
        }

      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    // <div className="rw-text-center">
    //   {'No ipdInvestigations yet. '}
    //   <Link to={routes.newIpdInvestigation()} className="rw-link">
    //     {'Create one?'}
    //   </Link>
    // </div>
    <>
    History Not Found
    </>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdInvestigations }) => {
  return (
    <div className="rw-scaffold">

    <header className="rw-header">
      <h1 className="rw-heading rw-heading-primary" >
        </h1>

    </header>
    <main className="rw-main"><IpdInvestigations ipdInvestigations={ipdInvestigations} /></main>
  </div>





  )
}
