import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';

const SignupPage = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        

        try{
            setLoading(true);
            setError(null);

            const response = await apiGanerator('user/sign-up', "POST", false, formData);
            console.log(response);
            

            const data = await response.json();
            
            
            if(!data.success){
                throw new Error(data.message);
                
            }

            navigate('/login');


        }catch(err){
            
            
            setError(err.message);
        }finally{
            setLoading(false);
        }

       
        
    }

    return (
        <section className='bg-green-100 min-h-screen flex items-center justify-center'>

            <div className='max-w-md w-full px-2 flex gap-6 flex-col'>

                <NavLink
                to='/'
                className='text-3xl text-center font-bold  block uppercase tracking-wider'>Podcaster</NavLink>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='username'>Username</label>
                        <input type="text" name='username' placeholder='username'
                        className='px-2 py-2 text-lg border border-gray-400 '
                        required
                        value={formData.username}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email'>Email</label>
                        <input type="text" name='email' placeholder='email'
                        className='px-2 py-2 text-lg border border-gray-400 '
                        required
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='password'>Password</label>
                        <input type="password" name='password' placeholder='password'
                        className='px-2 py-2 text-lg border border-gray-400 '
                        required
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="on"
                        />
                    </div>

                    {error && <div className='text-red-600 uppercase text-center font-semibold text-sm'>{error}</div>}

                    <div className='flex flex-col gap-4'>
                        <button className='py-2 rounded-lg text-white bg-green-900 font-semibold'>
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>

                        <span className='font-semibold text-center'>OR</span>

                        <p className='text-gray-700 text-center'>Already have an Account?
                            <NavLink to='/login' className='text-blue-700 hover:text-blue-900 font-semibold ml-2'>Login</NavLink>
                        </p>

                    </div>


                </form>

            </div>



        </section>
    )
}

export default SignupPage