import Link from "next/link";




export default function Home() {
  return (
    <>
      <h1>Welcome to Arturo Requejo Final exam</h1>
        <Link href={`/events`}>Show events</Link>
        <Link href={`/modifyevents`}>Modify events</Link>

    </>
  )
}
