import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/ApiSlices/authApiSlice";
import { setCredentials } from "../../redux/featureSlices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirecturl = sp.get("redirect") || "/";

  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirecturl);
    }
  }, [navigate, redirecturl, userInfo]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ res }));
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl md:grid-cols-[1.05fr_1fr]">
          <div className="relative hidden flex-col justify-between gap-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-10 text-white md:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.25),_transparent_60%)]" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Welcome Back</p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight">Sign in to pick up where you left off.</h1>
              <p className="mt-4 text-sm text-slate-200">Track orders, save favorites, and enjoy faster checkout.</p>
            </div>
            <div className="relative z-10 grid gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">?</span>
                Personalized recommendations
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">?</span>
                Faster reorders
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">?</span>
                Secure checkout
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
            <div>
              <p className="text-sm font-medium text-slate-500">Sign in</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Customer login</h2>
            </div>

            <form onSubmit={handlesubmit} className="mt-8 grid gap-5">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => setPass(e.target.value)}
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-slate-900 hover:text-slate-700">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
