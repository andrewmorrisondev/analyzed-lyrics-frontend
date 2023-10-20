import { useState, useEffect } from "react"
import * as authService from "./../services/authService"

export default function useAuth(code: string) {

  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  // console.log('useAuth');
  let cat = 0
  useEffect(() => {
    cat++
    console.log(cat, code)
    if (code && cat > 1) {
      const fetchAuthInfo = async (code: string) : Promise<void> => {
        console.log()
        try {
          cat++
          const authData = await authService.login(code)
          
          if (authData && authData.accessToken) {
            setAccessToken(authData.accessToken)
            setRefreshToken(authData.refreshToken)
            setExpiresIn(authData.expiresIn)
            // console.log('accessToken: ', authData.accessToken, 'refreshToken: ', authData.refreshToken, 'expiresIn: ', authData.expiresIn)
          }
        } catch (err) {
          console.log(err)
        }
      }
      fetchAuthInfo(code)
    }
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      const fetchRefreshAuth = async (refreshToken: string) : Promise<void> => {
        try {
          const refreshTokenData = await authService.refreshAuth(refreshToken)
          setAccessToken(refreshTokenData.accessToken)
          setExpiresIn(refreshTokenData.expiresIn)
        } catch (err) {
          console.log(err)
        }
      }
      fetchRefreshAuth(refreshToken)
    }, (expiresIn - 60) * 1000)
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}