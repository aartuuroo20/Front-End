import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <h1>Home page where is nothing to see</h1>
      <Link href="/table">Table</Link>
    </>
  )
}
