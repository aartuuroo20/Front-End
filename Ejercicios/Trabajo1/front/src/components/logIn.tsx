import { useRouter } from "next/router";
import { useState } from "react"


const LogIn = () => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showpassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const router = useRouter();

    const checkUser = async () => {
        const response = await fetch("http://localhost:8080/LogIn", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if(response.status === 200){
            router.push("/table?username="+username)
        }else{
            setError(true)
        }
    }

    return (
        <>
            <div className="container">
                {error ? <p className="error">Usuario o contraseña incorrectos</p> : null}
                <input className="InputsRegistro" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input className="InputsRegistro" type={showpassword ? "text" : "password"} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="checkbox" onClick={() => setShowPassword(!showpassword)}></input>
                <button className="BotonCreacion" type="submit" onClick={(e) => checkUser()}>Log In</button>
            </div>
        </>
    )
}

export default LogIn