import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useEffect, useState } from 'react';

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
  hide
}) => {

  const [type, settype] = useState("");

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
