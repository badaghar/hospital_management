import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import HomePageCell from 'src/components/HomePageCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div  className='relative'>
        <img src="/SVMH_log.jpg" alt="" srcset="" className='absolute h-[90vh] z-0 rounded-full left-[20vw] ' />

        <HomePageCell />
      </div>
    </>
  )
}

export default HomePage
