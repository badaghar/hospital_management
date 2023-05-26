import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H7Page = () => {
  return (
    <>
      <MetaTags title="H7" description="H7 page" />

      <h1>H7Page</h1>
      <p>
        Find me in <code>./web/src/pages/H7Page/H7Page.js</code>
      </p>
      <p>
        My default route is named <code>h7</code>, link to me with `
        <Link to={routes.h7()}>H7</Link>`
      </p>
    </>
  )
}

export default H7Page
