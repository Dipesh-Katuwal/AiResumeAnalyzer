import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { assetUrl } from "~/lib/utils";

export const meta = () => {
  return [
    { title: "ResumeAnalyzer | Login " },
    { name: "description", content: "Log into your account" },
  ];
};

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main
      className="bg-cover min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${assetUrl("images/bg-main.svg")})` }}
    >
      <div className="gradient-border shadow-2lg">
        <section className="flex flex-col gap bg-white rounded-2xl p-5">
          <div className="flex flex-col items-center text-center ">
            <h1>Welcome</h1>
            <h2 className="my-1">Login to your puter account</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                signing you in ...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-primary" onClick={auth.signOut}>
                    <p>LogOut</p>
                  </button>
                ) : (
                  <button className="auth-primary" onClick={auth.signIn}>
                    <p>LogIn</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
