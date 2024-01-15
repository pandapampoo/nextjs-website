'use client'
import * as React from 'react';
import Button from '../Button';
import { useContext, useRef, useState } from 'react';
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
  

  const Auth: any = useContext(AuthContext)  

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(true);
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const location = searchParams.get('from')

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setLoading(true)
    const data = await Auth.login(username, password)
      .finally(() => {
        setLoading(false)
      })
    if (!data?.error) {
      setErrMsg('')
      location && redirectTo(location)
    } else {
      setErrMsg(data?.error)
    }
  }

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Auth.logout()
  }

  const redirectTo = (_location:string) => {
    router.push(_location)
  }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        {Auth.user ? (
          <div>
            <p className="text-xl font-bold leading-tight tracking-tight mb-5 text-gray-900 md:text-2xl dark:text-white text-center">
              You were log in
            </p>
            <Button styleOnly>
              <Link href="/">Go to Home</Link>
            </Button>
            <br></br>
            <Button onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold leading-tight mb-5 tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <FormControl fullWidth>
                <TextField id="username" label="Username" variant="outlined" className='w-full' defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" defaultChecked={remember} onChange={() => setRemember((state) => !state)} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              {errMsg &&
                <Alert severity="error">{errMsg}</Alert>
              }
              <Button type="button" className="w-full" onClick={handleSubmit} loading={loading}>Sign in</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
