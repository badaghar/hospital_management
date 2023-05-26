import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const H5Page = () => {
  return (
    <>
      <MetaTags title="H5" description="H5 page" />

      <h1>H5Page</h1>
      <p>
        Find me in <code>./web/src/pages/H5Page/H5Page.js</code>
      </p>
      <p>
        My default route is named <code>h5</code>, link to me with `
        <Link to={routes.h5()}>H5</Link>`
      </p>
    </>
  )
}

export default H5Page
