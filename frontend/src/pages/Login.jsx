import React from "react";
import useAuth from "../hooks/useAuth";
import GoogleIcon from "../icons/GoogleIcon";

const Login = () => {
  const { login } = useAuth();
  return (
    <div className="flex flex-col bg-base-200 gap-6 justify-center items-center h-screen">
      <div className="md:w-2/6 sm:w-3/6 w-11/12 px-6 sm:px-10 py-6 card gap-3 bg-base-100  shadow">
        <h2 className="text-lg font-semibold text-center tracking-wide">Login to EasyMail</h2>
        <button
            onClick={login}
            className='btn btn-square btn-block gap-4'
          >
            <GoogleIcon className={'w-6'}/>
              Continue with Google
          </button>
          <div className='w-full flex items-center justify-between pt-2'>
            <hr className='w-full bg-gray-400' />
            <p className='text-sm md:text-base font-medium leading-4 px-2.5 text-gray-400'>OR</p>
            <hr className='w-full bg-gray-400  ' />
          </div>
        <form className="form-control w-full gap-2">
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered input-neutral w-full`}
            />
          </div>
          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered input-neutral w-full`}
            />
          </div>
          <div className="flex justify-between mt-2 items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="checkbox checkbox-neutral" />
              <span className="label-text">Remember me</span>
            </div>
            <a className="label-text text-primary-focus cursor-pointer hover:underline">
              Forget password ?
            </a>
          </div>

          <button type="button" className="btn btn-neutral mt-4 mb-2">
            {" "}
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
