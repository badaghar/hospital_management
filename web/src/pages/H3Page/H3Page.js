import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H3Page = () => {
  return (
    <>
      <MetaTags title="H3" description="H3 page" />

      <h1>H3Page</h1>
      <p>
        Find me in <code>./web/src/pages/H3Page/H3Page.js</code>
      </p>
      <p>
        My default route is named <code>h3</code>, link to me with `
        <Link to={routes.h3()}>H3</Link>`
      </p>
    </>
  )
}

export default H3Page
