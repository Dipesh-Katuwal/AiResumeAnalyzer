import type { Route } from "./+types/home";
import NavBar from "~/components/NavBar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { assetUrl } from "~/lib/utils";
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
  const { isLoading, auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate("/auth?next=/");
  }, [isLoading, auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      console.log(parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main
      className="bg-cover"
      style={{ backgroundImage: `url(${assetUrl("images/bg-main.svg")})` }}
    >
      <NavBar />
      <section className="main-section">
        <div className="page-heading py-5">
          <h1>Track your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>No Resumes found.Upload your first Resume to get feedback</h2>
          ) : (
            <h2> Review your submissions and check ai-powered feedback</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col justify-center items-center">
            <img
              src={assetUrl("images/resume-scan2.gif")}
              className="w-200px"
            ></img>
          </div>
        )}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
