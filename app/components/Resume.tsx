import React from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { Route } from "react-router";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useState } from "react";
import Summary from "./Summary";
import Details from "./Details";
import ATS from "./ATS";
export const meta = () => {
  return [
    { title: "Resume | Review" },
    {
      name: "description",
      content: "Detailed overview of your resume",
    },
  ];
};

const Resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading, auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback });
    };
    loadResume();
  }, [id]);

  return (
    <main className="pt-0!">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5"></img>
          <span className="text-gray-800 font-semibold text-sm">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 justify-center items-center overflow-hidden">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 w-full max-w-2xl flex items-center justify-center">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="ml-15">
                <img
                  src={imageUrl}
                  className="max-w-[90%] max-h-[90%] object-contain rounded-2xl"
                  title="resume"
                ></img>
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section text-2xl!">
          <h2 className="text-black! text-4xl font-serif w-full text-center">
            Resume Review
          </h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
             <Summary feedback={feedback}/>
             <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
             <Details feedback={feedback}/> 
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full"></img>
          )}
        </section>
      </div>
    </main>
  );
};
export default Resume;
