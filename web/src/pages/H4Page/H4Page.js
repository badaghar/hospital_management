import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H4Page = () => {
  return (
    <>
      <MetaTags title="H4" description="H4 page" />

      <h1>H4Page</h1>
      <p>
        Find me in <code>./web/src/pages/H4Page/H4Page.js</code>
      </p>
      <p>
        My default route is named <code>h4</code>, link to me with `
        <Link to={routes.h4()}>H4</Link>`
      </p>
    </>
  )
}

export default H4Page
