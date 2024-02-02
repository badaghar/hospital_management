import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import LabWaitingCell from 'src/components/LabWaitingCell'

const LabWaitingPage = ({lab}) => {
  return (
    <>
      <MetaTags title="LabWaiting" description="LabWaiting page" />

        <LabWaitingCell lab={lab} />
    </>
  )
}

export default LabWaitingPage
