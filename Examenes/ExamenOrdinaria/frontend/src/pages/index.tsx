import Events from '@/components/events'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <h1>Welcome to Arturo Requejo final exam</h1>
    <Events></Events>
     
    </>
  )
}
