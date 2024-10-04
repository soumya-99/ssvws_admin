import React from 'react'
import { routePaths } from '../Assets/Data/Routes';
import { useNavigate } from 'react-router-dom';
import TDInputTemplate from './TDInputTemplate';

const PasswordComp = ({mode}) => {
  const navigate=useNavigate()
  return (
      

    <div className="max-w-sm mx-auto" >
      
    
      <div className="mb-5 relative">
      <TDInputTemplate
                    placeholder="*****"
                    type="password"
                    label="Old password"
                    name="password"
                    formControlName={''}
                    handleChange={''}
                    handleBlur={''}
                    mode={1}
                  />
      </div>
      <div className="mb-5">
      <TDInputTemplate
                    placeholder="*****"
                    type="password"
                    label="New password"
                    name="password"
                    formControlName={''}
                    handleChange={''}
                    handleBlur={''}
                    mode={1}
                  />
      </div>
      <div className="mb-5">
      <TDInputTemplate
                    placeholder="*****"
                    type="password"
                    label="Confirm password"
                    name="password"
                    formControlName={''}
                    handleChange={''}
                    handleBlur={''}
                    mode={1}
                  />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input id="remember"   type="checkbox" value="" className="w-4 h-4 border border-green-900 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
        <label for="remember" className="ms-2 text-sm font-medium text-green-900 dark:text-gray-300">Show Password</label>
      </div>
      <div className='flex justify-between'>
     {mode==3 && <button type="submit" onClick={()=>{localStorage.clear();navigate(routePaths.LANDING)}} className="text-white bg-green-900 hover:bg-
      green-900 focus:ring-4 mr-4 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-blue-400">
        Sign Out
      </button>}
      <button type="submit"  className="text-white bg-green-900 hover:bg-
      green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-blue-400">
        Submit
      </button>

      </div>
     
    </div>
    
  )
}

export default PasswordComp