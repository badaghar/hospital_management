import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import HomePageCell from 'src/components/HomePageCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

        <HomePageCell />
    </>
  )
}

export default HomePage
