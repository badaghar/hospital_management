import { Link, navigate, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useState,useLayoutEffect,useEffect } from 'react';
// import { useLayoutEffect } from 'react-js-dialog-box';
import { useAuth } from 'src/auth'
const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
  hide
}) => {
  const [type, settype] = useState("");
  const { isAuthenticated,currentUser, signUp } = useAuth()
  useLayoutEffect(()=>{
    let name = window.location.pathname.split('/');
    name = name[name.length - 1]
    let pt
    // let refresh
    if (name == 'IPD' || name == 'OPD') {
      pt=name



      // let str = ''.toLowerCase()
    }

    // if(name)
    const isAdmin = currentUser?.roles=='admin'
    // console.log(currentUser.permissions,'title',title)
    // console.log('====================================');
    // console.log(currentUser?.permissions?.bed,title.toLowerCase());
    // console.log('====================================');
    if(
      currentUser?.permissions?.pharmacy?.includes(title) ||
      currentUser?.permissions?.pharma   ==false ||
      currentUser?.permissions?.charges?.includes(title) ||
      currentUser?.permissions?.bed?.includes(title.toLowerCase()) ||
      currentUser?.permissions?.patientType?.includes(pt) ||
      (currentUser?.permissions?.patientType?.includes(title)) ||
      // currentUser?.permissions?.patientType?.includes(p) ||
      title=='Patients' ||
      window.location.pathname.toLowerCase().includes('ipds') ||
      window.location.pathname.toLowerCase().includes('opds') ||
      // title
      // currentUser?.permissions?.patientType?.includes('OPD') ||
     isAdmin
    ){
      console.log(currentUser?.permissions)
    }
    else{

      navigate(routes.home(), { replace: true })
    }
  },[])
  useEffect(() => {
    // const location = useLocation();
    let name = window.location.pathname.split('/');
    name = name[name.length - 1]
    if (name == 'IPD' || name == 'OPD') {
      settype(name)
    }
    // console.log(name[name.length-1])
    // settype(location.);
  }, [window.location.pathname]);
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          {
            (type != '') &&
            <Link to={routes[titleTo]({ type })} className="rw-link">
              {type}
            </Link>
          }
          {!hide && <Link to={routes[titleTo]()} className="rw-link">
            {title}
          </Link>}
        </h1>
        {
          (type != '') &&
          <Link to={routes[buttonTo]({ type })} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> {'Add '+type }
          </Link>
        }
                  {!hide &&  <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> {buttonLabel}
          </Link>}
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}
export default ScaffoldLayout
