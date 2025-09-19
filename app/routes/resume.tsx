import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import type { Route } from "./+types/resume";

import Summary from "~/components/feedback/Summary";
import ATS from "~/components/feedback/ATS";
import Details from "~/components/feedback/Details";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Review" },
    { name: "description", content: "Details overview of your resume" },
  ];
}

const Resume = () => {
  const { isLoading, auth, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading, auth.isAuthenticated]);

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

      setFeedback(data.feedback || "No feedback available.");
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="h-2.5 w-2.5" />
          <span className="text-sm font-semibold text-gray-800">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex w-full flex-row max-lg:flex-col-reverse">
        <section className="feedback-section sticky top-0 h-[100vh] items-center justify-center bg-[url('/images/bg-small.svg')] bg-cover">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in gradient-border h-[90%] w-fit duration-1000 max-xl:h-fit max-sm:m-0">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="resume"
                  className="h-full w-full rounded-2xl object-contain"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h1 className="text-4xl font-bold text-black">Resume Review</h1>
          {feedback ? (
            <div className="animate-in fade-in flex flex-col gap-8 duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
