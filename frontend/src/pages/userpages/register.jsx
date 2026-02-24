import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/ApiSlices/authApiSlice";

function Register (){
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPass]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [error,setError]=useState("");
const [register, { isLoading }] = useRegisterMutation();
const navigate=useNavigate()

const handlesubmit=async (e)=>{
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try{
      await register({ name, email, password }).unwrap();
      navigate("/login", { state: { fromRegister: true } });
    } catch (err) {
      setError(err?.data?.message || "Registration failed");
    }
}
    return(
<div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50">
  <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
    <div className="grid w-full max-w-5xl grid-cols-1 gap-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl md:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden flex-col justify-between gap-8 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-10 text-white md:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,191,36,0.2),_transparent_60%)]" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Create Account</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight">Join to unlock smarter shopping.</h1>
          <p className="mt-4 text-sm text-emerald-100">Save carts, track orders, and get tailored picks.</p>
        </div>
        <div className="relative z-10 grid gap-3 text-sm text-emerald-100">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">?</span>
            One‑click reorders
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">?</span>
            Secure checkout
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">?</span>
            Exclusive drops
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
        <div>
          <p className="text-sm font-medium text-slate-500">Sign up</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create your account</h2>
        </div>

        <form onSubmit={handlesubmit} className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Jane Doe"
              onChange={(e)=>setName(e.target.value)}
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />   
          </div> 

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(e)=>setEmail(e.target.value)}
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />   
          </div> 

          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              onChange={(e)=>setPass(e.target.value)}
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />   
          </div>

          <div className="grid gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />   
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-slate-900 hover:text-slate-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
    )


}
export default Register
