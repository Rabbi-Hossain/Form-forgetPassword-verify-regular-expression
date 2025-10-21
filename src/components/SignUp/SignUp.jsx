import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfige";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {

    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleOnsubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(name, photo, email, password, terms);



        const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if(passwordRe.test(password) === false){
            setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
            return
        }

        if(!terms){
            setErrorMessage('Please Accepts Terms and Conditions')
            return
        }

        //reset 
        setSuccess(false)
        setErrorMessage('')

        // Create User Account
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                // email verification
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    setSuccess(true)
                    alert('please give me check your gmail verify')
                })

                // update profile
                const profile = {
                    displayName: name,
                    photoURL: photo
                }

                updateProfile(auth.currentUser, profile)
                .then(()=>{
                    console.log('profile update is successfully');
                })
                .catch(error=>{
                    console.log(error.message);
                })


            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage(error.message)
            })

    }


    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="card  w-full max-w-sm  p-5 border">
                <div className="card-body">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                    <form onSubmit={handleOnsubmit} className="fieldset mt-8">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" placeholder="Your Name" />
                        <label className="label">Photo URL</label>
                        <input type="text" name="photo" className="input" placeholder="photo url" />
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>

                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} name="password" className="input" placeholder="Password" />
                            <button type="button" onClick={() => { setShowPassword(!showPassword) }} className=" absolute top-2 right-3 stack">{showPassword ? <FaEyeSlash size={20} /> : <IoEyeSharp size={20} />}</button>
                        </div>
                        <label className="label mt-3">
                            <input type="checkbox" name="terms" className="checkbox" />
                            Accepts Terms and Conditions
                        </label>
                        <button type="submit" className="btn btn-neutral mt-4">Sing Up</button>
                    </form>
                    <p>Already have an account ? <Link to='/login' className="text-blue-500 underline">LogIn</Link></p>
                </div>
                {
                    success && <p className="text-green-500 font-bold">New User Create Successfully</p>
                }
                {
                    errorMessage && <p className="text-red-500 font-bold">{errorMessage}</p>
                }
            </div>
        </div>
    );
};

export default SignUp;