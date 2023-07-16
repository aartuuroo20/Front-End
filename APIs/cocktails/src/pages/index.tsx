import { Inter } from '@next/font/google'
import Cocktails from '@/components/cocktails'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Cocktails></Cocktails>
      
    </>
  )
}
