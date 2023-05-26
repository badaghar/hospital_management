import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H2Page = () => {
  return (
    <>
      <MetaTags title="H2" description="H2 page" />

      <h1>H2Page</h1>
      <p>
        Find me in <code>./web/src/pages/H2Page/H2Page.js</code>
      </p>
      <p>
        My default route is named <code>h2</code>, link to me with `
        <Link to={routes.h2()}>H2</Link>`
      </p>
    </>
  )
}

export default H2Page
