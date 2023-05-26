import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H1Page = () => {
  return (
    <>
      <MetaTags title="H1" description="H1 page" />

      <h1>H1Page</h1>
      <p>
        Find me in <code>./web/src/pages/H1Page/H1Page.js</code>
      </p>
      <p>
        My default route is named <code>h1</code>, link to me with `
        <Link to={routes.h1()}>H1</Link>`
      </p>
    </>
  )
}

export default H1Page
