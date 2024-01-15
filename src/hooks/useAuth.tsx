import { WORDPRESS_URL } from "@/config/init";
import { TUser } from "@/types/TUser";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';


export default function useAuth() {

  const [user, setUser] = useState<TUser | null>(null)

  useEffect(() => {
    if (isLoggedIn()) {
      setUser(getAuth())
    }
  }, [])

  async function login(username: string, password: string) {

    let errMsg = null;

    const validateInput = validate(username, password);

    if (validateInput !== true) {
      errMsg = validateInput
    } else {
      try {
        const response = await fetch(WORDPRESS_URL + '/wp-json/gs-jwt/v1/login ', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        })
        const responseUser = await response.json()
        if (responseUser.data.id) {
          setUser(responseUser.data)
          saveLoginInfo(responseUser.data)
          toast.success('Login success')
        } else {
          errMsg = 'The Username or Password is Incorrect.'
        }
      } catch (error: any) {
        if (!error?.response) {
          errMsg = 'No server response'
        } else if (error?.response?.status === 400) {
          errMsg = 'Missing Username or Password'
        } else if (error?.response?.status === 401) {
          errMsg = 'Unauthorized'
        } else {
          errMsg = 'Login failed'
        }
      }
    }
    if (errMsg) toast.error(errMsg.toString())
    return { error: errMsg }
  }

  function validate(username: string, password: string) {
    const usernameRegex = /^[a-zA-Z0-9_]{4,}[a-zA-Z]+[0-9]*$/g;
    if (!username) {
      return 'Username is required'
    } else if (!password) {
      return 'Password is required'
    } else if (!usernameRegex.test(username)) {
      return 'Username contains invalid characters';
    } else {
      return true
    }
  }

  function isLoggedIn() {
    return localStorage.getItem('auth')
  }

  function saveLoginInfo(auth: TUser) {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  function logout() {
    localStorage.removeItem('auth');
    setUser(null)
  }

  function getAuth() {
    const auth = localStorage.getItem('auth')
    if (auth) return JSON.parse(auth);
  }

  return { user, login, isLoggedIn, logout, getAuth }
}
