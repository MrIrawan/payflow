'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { AdminSignInRequest } from '@/types/request';

import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

import { InputGroup } from '@/components/InputGroup/input-group';

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<AdminSignInRequest>();

    const onSubmit: SubmitHandler<AdminSignInRequest> = async (data) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Admin Sign In Data:', data);
            setIsLoading(false);
        }, 2000);
    }

    return (
        <>
            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-10">
                <div className="w-full max-w-sm">
                    {/* Mobile Header */}
                    <div className="lg:hidden mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">PayFlow</h1>
                        <p className="text-gray-600 text-sm">Admin Portal</p>
                    </div>

                    {/* Welcome Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back! Admin Payflow.</h3>
                        <p className="text-gray-600 text-sm">
                            Sign in to your admin account to access PayFlow's control center.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Input */}
                        <InputGroup
                            label='Admin Username'
                            id='username'
                            htmlFor='username'
                            type='text'
                            className='placeholder:text-sm placeholder:font-medium text-4xl'
                            placeholder='Admin PayFlow'
                            aria-invalid={errors.username ? "true" : "false"}
                            errorMsg={errors.username?.message}
                            {...register('username', { required: 'Admin Username is required' })}
                        />

                        {/* Password Input */}
                        <InputGroup
                            label='Admin Password'
                            id='password'
                            htmlFor='password'
                            type='password'
                            className='placeholder:text-sm placeholder:font-medium text-4xl'
                            placeholder='**********'
                            aria-invalid={errors.password ? "true" : "false"}
                            errorMsg={errors.password?.message}
                            {...register('password', { required: 'Admin Password is required' })}
                        />

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-start text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded-lg cursor-pointer" />
                                <span className="text-gray-700">Remember me</span>
                            </label>
                        </div>

                        {/* Login Button */}
                        <Button className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-xl transition duration-200 flex items-center justify-center gap-2'>
                            {isLoading ? <Spinner /> : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
