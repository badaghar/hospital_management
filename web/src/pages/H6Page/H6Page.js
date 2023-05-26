import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H6Page = () => {
  return (
    <>
      <MetaTags title="H6" description="H6 page" />

      <h1>H6Page</h1>
      <p>
        Find me in <code>./web/src/pages/H6Page/H6Page.js</code>
      </p>
      <p>
        My default route is named <code>h6</code>, link to me with `
        <Link to={routes.h6()}>H6</Link>`
      </p>
    </>
  )
}

export default H6Page
