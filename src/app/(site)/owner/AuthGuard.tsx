import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

export default async function AuthGuard({ children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value; 

  if (!token) {
    console.log('No token found, redirecting to signin');
    redirect('/signin')
    return null;
  }

  try {
    return <>{children}</>
  } catch (err) {
    console.error('JWT verification failed:', err)
    redirect('/signin')
    return null;
  }
}

