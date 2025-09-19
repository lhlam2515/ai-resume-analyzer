import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import type { Route } from "./+types/upload";

import Navbar from "~/components/Navbar";
import UploadForm from "~/components/UploadForm";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdf2image";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

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
  const { isLoading, auth, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/upload`);
    }
  }, [isLoading, auth.isAuthenticated]);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    resume,
  }: AnalyzePayload) => {
    setIsProcessing(true);
    setStatusText("Uploading the resume...");

    const uploadedFile = await fs.upload([resume]);
    if (!uploadedFile) {
      return setStatusText("Error: Failed to upload the resume.");
    }

    setStatusText("Converting to image...");
    const convertedFile = await convertPdfToImage(resume);
    if (!convertedFile.file) {
      return setStatusText("Error: Failed to convert PDF to image.");
    }

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([convertedFile.file]);
    if (!uploadedImage) {
      return setStatusText("Error: Failed to upload the image.");
    }

    setStatusText("Prepering data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing the resume...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback) return setStatusText("Error: Failed to analyze the resume.");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;
    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analysis complete, redirecting...");
    console.log("Analysis complete:", data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, resume: file });
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
