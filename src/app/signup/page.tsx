"use client";  // to enable UI rendering on client side
import React from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  });

  const router = useRouter();

  const [disabledBtn, changeDis] = React.useState(false);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
      toast.success("User Created Successfully");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    }
  }

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      changeDis(true);
    } else {
      changeDis(false);
    }
  }, [user]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center">Signup</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input className="text-blue-400 rounded-sm px-1"
          type="text"
          value={user.username}
          id="username"
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
          placeholder="Type your username"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="email">Email</label>
        <input className="text-blue-400 rounded-sm px-1"
          type="email"
          value={user.email}
          id="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          placeholder="Type your email"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="password">Password</label>
        <input className="text-blue-400 rounded-sm px-1"
          type="password"
          value={user.password}
          id="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          placeholder="Type your password"
        />
      </div>
      <div className="flex justify-center items-center p-2">
        {disabledBtn ?
          <button className="px-2 bg-red-500 text-white font-bold" onClick={onSignup}>
            Signup
          </button>
          : <button className="px-2 bg-red-500 text-white font-bold cursor-not-allowed" disabled>
            Signup
          </button>
        }
      </div>
      <Link className="text-blue-400 text-center" href="/login">Go back to Login</Link>
    </div>
  );
}
