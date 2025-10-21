import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfige";
import { Link } from "react-router";
import { useRef, useState } from "react";

const Login = () => {

    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const emailRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset
        setErrorMessage('')
        setSuccess(false)
        // signIn user
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    console.log('must be check email verify')
                } else {
                    setSuccess(true)
                }
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage(error.message)
            })
    }

    const forgetPassword = ()=>{
        console.log(emailRef.current.value);
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('password reset email sent')
        })
        .catch(error=>{
            console.log(error.message);
        })
    }


    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="card  w-full max-w-sm border p-5">
                <div className="card-body">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" ref={emailRef} name="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Password" />
                        <div onClick={forgetPassword}><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </form>
                    {
                        success && <p className="text-green-500 ">{'Login is successfully'}</p>
                    }
                    {
                        errorMessage && <p className="text-red-500">{errorMessage}</p>
                    }
                </div>
                <p className="text-center">Don’t have an account? <Link to='/signUp' className="text-blue-500 underline">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;