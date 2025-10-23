import LoginForm from '../components/login-form'
import {User2Icon } from 'lucide-react'

export default function LoginPage() {
  return (
    <>
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='warning text-primary flex flex-col items-center jusitfy-center m-8 p-2'>
                <User2Icon size={100} />
                <span className='text-red-300'>You are logging in as a admin!</span>
            </div>
            <LoginForm />
        </div>
    </>
  )
}
