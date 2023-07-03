import { Inter } from '@next/font/google'
import Link from 'next/link'

/*
Esta pagina es el inicio del proyecto, donde se puede elegir entre la pagina de medico o la de paciente para entrar en sus respectivas funcionalidades,
lo mas eficiente en este caso seria realizar un login donde ahi eliges si eres paciente o medico.
*/ 


export default function Home() {
  return (
    <>
      <Link href={`/paciente`}>Paciente</Link>
      <Link href={`/medico`}>Medico</Link>
    </>
  )
}
