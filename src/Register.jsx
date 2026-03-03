import { useState } from "react";
import api from "./api";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { ACCESS, REFRESH } from "./constants";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const res = await api.post("/token/", {
        username,
        password,
      });
      localStorage.setItem(ACCESS, res.data.access);
      localStorage.setItem(REFRESH, res.data.refresh);

      toast.success(" Registration Successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Register details");
    }
  };

  const Signup = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      await api.post("/register/", {
        username,
        email,
        password,
      });

      toast.success(" Registration Successful");
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Register details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-md p-10 rounded-3xl border border-border bg-card shadow-sm">
        <div className="w-fit flex items-center gap-2 mx-auto">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={` px-3 py-2 rounded-sm
            ${isLogin ? "bg-foreground text-background" : "text-foreground bg-primary/5"}
            `}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={` px-3 py-2 rounded-sm
            ${isLogin ? "text-foreground bg-primary/5" : "bg-foreground text-background"}
            `}
          >
            Signup
          </button>
        </div>

        <h2 className="text-3xl font-semibold text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-muted-foreground text-center mt-2 text-sm">
          {isLogin
            ? "Login to continue tracking your applications."
            : "Start your journey toward your next offer."}
        </p>

        <form className="mt-8 space-y-5">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
            placeholder="username"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />

          {!isLogin && (
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}

          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <button
            onClick={isLogin ? Login : Signup}
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-foreground font-medium hover:opacity-70 transition"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
