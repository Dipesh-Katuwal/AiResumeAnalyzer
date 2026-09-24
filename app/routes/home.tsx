import type { Route } from "./+types/home";
import NavBar from "~/components/NavBar";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeAnalyzer" },
    {
      name: "description",
      content: "Analyze your resume and get pro feedbacks!!!",
    },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate("/auth?next=/");
  }, [isLoading, auth.isAuthenticated, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover ">
      <NavBar />
      <section className="main-section">
        <div className="page-heading py-5">
          <h1>Track your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check ai-powered feedback</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
