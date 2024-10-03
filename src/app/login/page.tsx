"use client";
import React from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
  const [user, setUser] = React.useState({
    email:"",
    password: "",
  });
  const [disabledBtn, changeDis] = React.useState(false);
  
  React.useEffect(() => {
    if (user.password.length > 6 && user.email.length > 0) {
      changeDis(true);
    } else {
      changeDis(false);
    }
  }, [user]);

  const router = useRouter();

  const onLogin = async () => {
    try {
      const resp = await axios.post("/api/users/login", user);
      router.push("/profile");
      toast.success("Logged in Successfully");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err.message);
    }

  }
  return (
    <div className="min-h-[100vh] flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center">Login</h1>
        <hr />
        <label htmlFor="userName">Email</label>
        <input className="text-blue-400 rounded-sm px-1 "
          type="text"
          value={user.email}
          id="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            // console.log(user);
          }
          }
          placeholder="Type your email"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="password">password</label>
        <input className="text-blue-400 rounded-sm px-1"
          type="password"
          value={user.password}
          id="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            // console.log(user);
          }
          }
          placeholder="Type your password"
        />
      </div>
      <div className="flex justify-center items-center p-2">
      {disabledBtn ?
          <button className="px-2 bg-red-500 text-white font-bold" onClick={onLogin}>
            Login
          </button>
          : <button className="px-2 bg-red-500 text-white font-bold cursor-not-allowed" disabled>
            Login
          </button>
        }
      </div>
      <Link className="text-blue-400 text-center" href='/signup'>Go to Signup</Link>
    </div>
  )
}
