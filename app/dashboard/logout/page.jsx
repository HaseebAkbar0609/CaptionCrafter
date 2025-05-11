"use client";
import { signOutGoogle } from '@/utils/firebase_auth'
import { redirect } from 'next/dist/server/api-utils'
import React, { useEffect } from 'react'

export default function page() {
  useEffect(() => {
    const logout = async () => {
      const res = await signOutGoogle()
      if (res?.success) {
        redirect('/auth/login')
      } else {
        console.error('Logout failed')
        redirect('/dashboard')
      }
    }
    logout()
  }, [])
  return (
    <div>
      
    </div>
  )
}
