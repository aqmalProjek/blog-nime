"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

export default function Provider({children}) {
  return (
    <SessionProvider>
      <RecoilRoot>
        {children}
      </RecoilRoot>
    </SessionProvider>
  )
}
