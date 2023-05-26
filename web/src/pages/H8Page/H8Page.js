import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H8Page = () => {
  return (
    <>
      <MetaTags title="H8" description="H8 page" />

      <h1>H8Page</h1>
      <p>
        Find me in <code>./web/src/pages/H8Page/H8Page.js</code>
      </p>
      <p>
        My default route is named <code>h8</code>, link to me with `
        <Link to={routes.h8()}>H8</Link>`
      </p>
    </>
  )
}

export default H8Page
