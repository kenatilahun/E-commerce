import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUsersQuery, useMakeAdminMutation } from "../../../redux/ApiSlices/adminUsersApiSlice";

const UsersAdmin = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data, isLoading, error } = useGetUsersQuery();
  const [makeAdmin, { isLoading: isPromoting }] = useMakeAdminMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!(userInfo.isAdmin || userInfo.role === "admin")) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleMakeAdmin = async (id) => {
    try {
      await makeAdmin(id).unwrap();
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Failed to promote user");
    }
  };

  if (isLoading) {
    return <div className="text-sm text-slate-600">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error?.data?.message || "Failed to load users"}
      </div>
    );
  }

  const users = data?.users || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Admin</p>
          <h2 className="text-xl font-semibold text-slate-900">Customers</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {users.length} users
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Verified</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-3 font-medium text-slate-800">{user.name}</td>
                <td className="px-4 py-3 text-slate-600">{user.email}</td>
                <td className="px-4 py-3 text-slate-600">{user.role || "user"}</td>
                <td className="px-4 py-3 text-slate-600">
                  {user.emailVerified ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3">
                  {user.isAdmin || user.role === "admin" ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Admin
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={isPromoting}
                      className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      Make admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAdmin;
