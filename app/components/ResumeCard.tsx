import { useEffect, useState } from "react";
import { Link } from "react-router";

import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

interface Props {
  resume: Resume;
}

const ResumeCard = ({ resume }: Props) => {
  const { companyName, jobTitle, imagePath, feedback } = resume;
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadImage();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h3 className="text-xl font-bold break-words text-black sm:text-3xl">
              {companyName}
            </h3>
          )}
          {jobTitle && (
            <p className="text-lg break-words text-gray-500">{jobTitle}</p>
          )}
          {!companyName && !jobTitle && (
            <h3 className="text-xl font-bold text-black">Resume</h3>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="h-full w-full">
            <img
              src={resumeUrl}
              alt={`Resume for ${jobTitle} at ${companyName}`}
              className="h-[200px] w-full object-cover object-top sm:h-[350px]"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
