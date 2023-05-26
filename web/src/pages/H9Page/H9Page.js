import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H9Page = () => {
  return (
    <>
      <MetaTags title="H9" description="H9 page" />

      <h1>H9Page</h1>
      <p>
        Find me in <code>./web/src/pages/H9Page/H9Page.js</code>
      </p>
      <p>
        My default route is named <code>h9</code>, link to me with `
        <Link to={routes.h9()}>H9</Link>`
      </p>
    </>
  )
}

export default H9Page
