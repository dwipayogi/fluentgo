import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  cookies().set({
    name: 'token',
    value: '',
    maxAge: 0,
    path: '/',
  })

  return NextResponse.json({ message: 'Logout successful' })
}
