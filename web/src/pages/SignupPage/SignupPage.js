import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import AllotLabCell from 'src/components/LabInCharge/AllotLabCell'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()
  const [role,setRole] = useState('')

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(routes.home())
  //   }
  // }, [isAuthenticated])

  // focus on username box on page load
  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const obj = {}
    let permissions = ''
    if (data.roles == 'pharmacy') {
      permissions = { pharmacy: ["Return Medicines", "SaleMedicines", "Medicines", "PurchaseMedicines", "Products", "Compositions", "Manufacturers", "Distributers", "PaymentPurchaseMedicinest"] }

    }
    else if (data.roles == 'doctor') {
      permissions = {
        // bed: ['floors', 'beds'],
        patientType: ['OPD']
      }
    }
    else if(data.roles == 'reciptionist'){
      permissions = {
        patientType: ['OPD']
      }
    }
    else if (data.roles == 'admin') {
      permissions = { admin: 'all' }
    }
    else if (data.roles == 'laboratory') {
      permissions = { labAssign:data.lab }
    }
    const response = await signUp({
      username: data.email,
      password: data.password,
      roles: data.roles,
      name: data.username,
      permissions
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
      navigate(routes.home())
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />
                  <Label
                    name="email"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="email"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"

                    validation={{
                      required: {
                        value: true,
                        message: 'email is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <FieldError name="password" className="rw-field-error" />

                  <div className='text-black'>


                    <Label
                      name="roles"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Select the Roles
                    </Label>

                    <SelectField
                      name="roles"
                      onChange={(e)=>setRole(e.target.value)}
                      validation={{
                        required: true,
                        validate: {
                          matchesInitialValue: (value) => {
                            return (
                              value !== 'Please select an option' || 'Select an Option'
                            )
                          },
                        },
                      }}
                    >
                      <option>Please select an option</option>
                      <option value={'admin'}>Admin</option>
                      <option value={'reciptionist'}>Reciptionist</option>
                      <option value={'pharmacy'}>Pharmacy</option>
                      <option value={'doctor'}>Doctor</option>
                      <option value={'laboratory'}>Laboratory</option>

                    </SelectField>

                    <FieldError name="roles" className="rw-field-error" />
                  </div>

                 {role=='laboratory' && <AllotLabCell />}

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          {/* <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div> */}
        </div>
      </main>
    </>
  )
}

export default SignupPage
