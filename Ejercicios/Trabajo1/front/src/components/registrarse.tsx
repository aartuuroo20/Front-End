import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"



const SignUp = () => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showpassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [users, setUsers] = useState<{username: string, password: string}[]>([])

    const router = useRouter();

    const addData = async () => {
        const response = await fetch("http://localhost:8080/addUser", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if(response.status === 400){
            setError(true)
        }

        const data = await response.json()
        setUsers([...users, data])
        router.push("/table?username="+username)
    }

    return(
        <>
            <div className="container">
                {error ? <p className="error">Usuario existente</p> : null}
                <input className="InputsRegistro" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input className="InputsRegistro" type={showpassword ? "text" : "password"} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="checkbox" onClick={() => setShowPassword(!showpassword)}></input>
                <button className="BotonCreacion" type="submit" onClick={() => addData()}>Sign Up</button>
                <Link href="/inicio">Haga click para iniciar sesion</Link>
            </div>
        </>
    )
}

export default SignUp