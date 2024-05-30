
import NavbarMenu from '@/components/padres/navbarMenu'
import React from 'react'

export default function layout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
        <NavbarMenu />
        {children}
    </div>
  )
}
