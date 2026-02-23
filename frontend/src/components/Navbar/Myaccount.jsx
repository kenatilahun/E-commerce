import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { logout } from "../../redux/featureSlices/authSlice";
import { useLogoutMutation } from "../../redux/ApiSlices/authApiSlice";

function Myaccount() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [logoutApiCall] = useLogoutMutation();

  const handletoggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const getUserInitials = () => {
    if (!userInfo?.name) return "U";
    return userInfo.name
      .split(" ")
      .map((namePart) => namePart[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  if (!userInfo) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Log in
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <Link
          to="/profile"
          className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-xs font-semibold text-white shadow-sm"
          aria-label="Go to profile"
        >
          {userInfo.avatar ? (
            <img
              src={userInfo.avatar}
              alt={userInfo.name || "User avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{getUserInitials()}</span>
          )}
        </Link>

        <button
          type="button"
          onClick={handletoggle}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span className="max-w-[120px] truncate">{userInfo.name}</span>
          <svg
            className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-lg"
          role="menu"
        >
          <Link
            to="/profile"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
            role="menuitem"
          >
            My Profile
          </Link>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="block w-full rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
            role="menuitem"
          >
            Orders
          </button>
          <button
            type="button"
            onClick={logoutHandler}
            className="block w-full rounded-lg px-3 py-2 text-left text-rose-600 transition hover:bg-rose-50"
            role="menuitem"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default Myaccount;
