import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LabWaitingPage = () => {
  return (
    <>
      <MetaTags title="LabWaiting" description="LabWaiting page" />

      <h1>LabWaitingPage</h1>
      <p>
        Find me in <code>./web/src/pages/LabWaitingPage/LabWaitingPage.js</code>
      </p>
      <p>
        My default route is named <code>labWaiting</code>, link to me with `
        <Link to={routes.labWaiting()}>LabWaiting</Link>`
      </p>
    </>
  )
}

export default LabWaitingPage
