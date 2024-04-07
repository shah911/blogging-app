import LoginForm from "@/components/LoginForm";
import React from "react";

async function Login() {
  return (
    <div className="w-[95%] mx-auto h-[600px] 2xl:h-[100vh] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default Login;
