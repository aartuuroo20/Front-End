import { Inter } from '@next/font/google'
import Characters from '@/components/characters'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Characters></Characters>
     
    </>
  )
}
