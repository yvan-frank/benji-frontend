import React from "react";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-full p-3">
      <form
        action=""
        className="flex flex-col gap-5 w-full lg:w-[37%] md:w-4/5  shadow px-10 py-12"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="p-2 outline-none border border-gray-500 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 outline-none border border-gray-500 rounded-md"
        />
        <button
          type="submit"
          className="p-2 outline-none bg-[#ffaf00] cursor-pointer text-white rounded-md"
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-[#ffaf00] cursor-pointer">SignUp?</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
