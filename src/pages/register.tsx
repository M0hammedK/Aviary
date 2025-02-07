// pages/register.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import { register as registerService } from '../lib/auth'
import RegisterForm from '../components/Auth/RegisterForm'
import { getCookie, setCookie } from 'cookies-next'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const token = getCookie("accessToken");
    if(token) router.push('/')

  const handleSubmit = async (name: string, email: string, password: string) => {
    try {
      const { user } = await registerService(name, email, password)
      router.push('/login')
    } catch (err:any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
