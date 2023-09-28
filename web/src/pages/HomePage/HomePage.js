import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import HomePageCell from 'src/components/HomePageCell'
import { useAuth } from "src/auth"
import IpdOperationPaymentCell from 'src/components/IpdOperationPayment/IpdOperationPaymentCell'
import IpdOperationPaymentsCell from 'src/components/IpdOperationPayment/IpdOperationPaymentsCell'
import HomePage2Cell from 'src/components/HomePage2Cell'
const HomePage = () => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />

   { (!hasRole('admin') || !hasRole('doctor')) &&  <div  className='relative'>
        <img src="/SVMH_log.jpg" alt="" srcset="" className='absolute h-[90vh] z-0 rounded-full left-[20vw] opacity-20 ' />


      </div>}
  {  (hasRole('admin') || hasRole('doctor')) &&  <div  className='relative bg-white text-black'>



        {
          hasRole('admin') &&
          <HomePageCell />
        }
        {
          (hasRole('admin') || hasRole('doctor')) &&
          <HomePage2Cell />
        }


      </div>}
    </>
  )
}

export default HomePage
