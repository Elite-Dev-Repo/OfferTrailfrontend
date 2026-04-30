import { useState } from "react";
import api from "./api";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { ACCESS, REFRESH } from "./constants";
import { LogIn } from "lucide-react";

import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";

import {
  Loading03Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // ADDED state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.clear();
      const res = await api.post("/token/", {
        username,
        password,
      });
      localStorage.setItem(ACCESS, res.data.access);
      localStorage.setItem(REFRESH, res.data.refresh);

      toast.success(" Registration Successful");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("error");
    }
  };

  const Signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.clear();
      await api.post("/register/", {
        username,
        email,
        password,
      });

      toast.success(" Registration Successful");

      setIsLogin(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Incorrect Register details");
    }
  };
  const dis = () => {
    if (loading === true) {
      return true;
    }
  };
  return (
    <div className="min-h-screen auth flex items-center justify-center text-foreground px-6 ">
      <Toaster position="top-center" richColors />
      <div className="w-full    max-w-md p-10 rounded-3xl border border-border bg-background  shadow-lg">
        <div className="w-fit flex items-center gap-2 mx-auto mb-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={` px-3 py-2 rounded-sm
            ${isLogin ? "bg-primary text-background" : "text-foreground bg-primary/5"}
            `}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={` px-3 py-2 rounded-sm
            ${isLogin ? "text-foreground bg-primary/5" : "bg-primary text-background"}
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

          {/* ADDED relative container to position the icon */}
          <div className="relative">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              // CHANGED type dynamically based on state
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              // ADDED pr-12 to make room for the icon so text doesn't overlap
              className="w-full px-4 pr-12 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {/* ADDED toggle button */}
            <button
              type="button" // Important: set to button so it doesn't submit form
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              <HugeiconsIcon
                icon={showPassword ? ViewOffIcon : ViewIcon}
                size={20}
              />
            </button>
          </div>

          <button
            onClick={isLogin ? Login : Signup}
            disabled={dis()}
            type="submit"
            className={`w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition ${loading && "opacity-50 hover:opacity-50"}`}
          >
            {loading ? (
              <div className="flex items-center w-full justify-center gap-3">
                Loading..{" "}
                <HugeiconsIcon
                  icon={Loading03Icon}
                  size={18}
                  className="animate-spin"
                />
              </div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
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
