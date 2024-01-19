import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DrWaitingCell from 'src/components/DrWaitingCell'

const DrWaitingPage = ({id}) => {
  return (
    <>
      <MetaTags title="DrWaiting" description="DrWaiting page" />
      <DrWaitingCell id={id} />

    </>
  )
}

export default DrWaitingPage
