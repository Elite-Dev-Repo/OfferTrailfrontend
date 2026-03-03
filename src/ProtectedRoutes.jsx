import axios from "axios";
import { ACCESS, REFRESH } from "./constants";
import api from "./api";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoutes({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const performAuth = async () => {
      try {
        await Auth();
      } catch {
        setIsAuth(false);
      }
    };
    performAuth();
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH);

    try {
      const res = await api.post("/token/refresh/", {
        refresh: refresh,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS, res.data.access);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      setIsAuth(false);
      console.log(error);
    }
  };

  const Auth = async () => {
    const token = localStorage.getItem(ACCESS);

    if (!token) {
      setIsAuth(false);
      return;
    }

    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      await refreshToken();
    } else {
      setIsAuth(true);
    }
  };

  if (isAuth === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="h-8 w-8 border-2 border-foreground/20 border-t-background rounded-full animate-spin"></div>

          {/* Text */}
          <p className="text-sm text-foreground/60 tracking-wide">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/register" />;
}

export default ProtectedRoutes;
