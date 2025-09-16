import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import type { Route } from "./+types/upload";

import Navbar from "~/components/Navbar";
import UploadForm from "~/components/UploadForm";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Upload" },
    {
      name: "description",
      content: "Upload your resume and job description to get started.",
    },
  ];
}

const Upload = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate(`/auth?next=/upload`);
    }
  }, [auth.isAuthenticated]);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    console.log({
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" alt="" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips.</h2>
          )}
          {!isProcessing && (
            <UploadForm
              onFileSelect={handleFileSelect}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
