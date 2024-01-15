'use client'
import * as React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from "@/context/AuthContext";
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Button from '../Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
type TProfileInfo = {
}
export default function ProfileInfo(props: TProfileInfo) {


  const [password, setPassword] = useState('******')
  const [showPassword, setShowPassword] = useState(true)
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  
  const Auth: any = useContext(AuthContext)
  const { user } = Auth

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {

  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight mb-5 tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Your Profile
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <FormControl fullWidth>
            <TextField id="username" label="Username" variant="outlined" className='w-full' defaultValue={user?.username} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              defaultValue={password}
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
          <FormControl fullWidth>
            <TextField id="firstname" label="First name" variant="outlined" className='w-full' defaultValue={user?.firstName} />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="lastname" label="First name" variant="outlined" className='w-full' defaultValue={user?.lastName} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={user?.gender}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          {errMsg &&
            <Alert severity="error">{errMsg}</Alert>
          }
          <Button className="w-full" onClick={handleSubmit} loading={loading}>Update</Button>
        </form>
      </div>
    </div>
  );
}
