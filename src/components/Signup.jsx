import  {  useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import useAuth from '../store/authContext';
import GoogleButton from 'react-google-button'


function Signup() {

    const navigate = useNavigate();
   const {user,signUp,signInWithGoogle}= useAuth();

    const formik = useFormik({
        initialValues: {
          email:'',
          password:''
        },
        validationSchema: Yup.object(
            {
              email: Yup.string().email('Invalid email format').required('Email required'),
              password:Yup.string().min(6,'Password must be of 6 chars').required('Password required')   
            }
        ),
        onSubmit: (values,{resetForm})=>{
            console.log(values);
            signUp(values);
            resetForm();

        }
        });

        console.log(user, "user in signup");
        


  return (
    <div>
    <h1 className='text-center text-4xl font-medium'>Firebase</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col items-center justify-center w-96 mx-auto mt-10 border p-5 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-6'>Signup Form</h2>
            <label htmlFor="email">Email:</label>
            {formik.touched.email && formik.errors.email ? <span className='text-red-500'>{formik.errors.email}</span> : null}
         
            <input type="text" id='email' placeholder='Enter your email' className='border p-2 rounded-lg w-full mb-6' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
            

            <label htmlFor="password">Password:</label>
             {formik.touched.password && formik.errors.password ? <span className='text-red-500'> {formik.errors.password}</span> :null}
          
                 <input type="password" id='password' placeholder='Enter your password' className='border p-2 rounded-lg w-full mb-6' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
             <button type='submit' className='bg-blue-500 text-white px-8 py-2.5 rounded-lg mt-2 mb-5'>Signup</button>
            <GoogleButton  onClick={signInWithGoogle} ></GoogleButton>
             <p>Already have an account? <a href="/login" className='text-blue-500 mt-8'>Login</a></p>
        </div>
      </form>
      </div>
    
  )
}

export default Signup