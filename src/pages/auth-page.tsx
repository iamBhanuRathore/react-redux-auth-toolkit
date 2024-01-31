import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import { useState } from "react";

const AuthPage = () => {
  const [form, setForm] = useState<"loginform" | "registerform">("loginform");
  const handleFormChange = () => {
    setForm((p) => (p === "loginform" ? "registerform" : "loginform"));
  };
  return (
    <div className="flex h-full items-center justify-center bg-pink-300">
      {form === "loginform" ? (
        <LoginForm handleFormChange={handleFormChange} />
      ) : (
        <RegisterForm handleFormChange={handleFormChange} />
      )}
    </div>
  );
};

export default AuthPage;
