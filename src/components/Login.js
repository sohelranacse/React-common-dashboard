import axios from "axios"
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { Context } from "../context/Context";

export default function Login() {
  document.title = "Login"

  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)

  const [success, setSuccess] = useState(false)
  const [msg, setMsg] = useState('')
  

  const handleLogin = async (e) => {
    e.preventDefault()
    setSuccess(false)

    try {
      const res = await axios.post("/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      if (res.data.error) {
        setMsg(res.data.error.msg)
        setSuccess(true)
      } else {
        // console.log("success")
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  
  return (
    <div className="container">

      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>

                    {success &&
                      <div className="alert alert-warning fade show" role="alert">
                        {msg}
                      </div>
                    }

                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email or Username..."
                          ref={userRef}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user"
                          placeholder="Password"
                          ref={passwordRef}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">Remember
                          Me</label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block" disabled={isFetching}>
                        Login
                      </button>
                    </form>

                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/register">Create an Account!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
