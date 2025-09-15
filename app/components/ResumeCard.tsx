import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

interface Props {
  resume: Resume;
}

const ResumeCard = ({ resume }: Props) => {
  const { companyName, jobTitle, imagePath, feedback } = resume;

  return (
    <Link
      to={`/resumes/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold break-words text-black max-sm:text-xl">
            {companyName}
          </h3>
          <p className="text-lg break-words text-gray-500">{jobTitle}</p>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="h-full w-full">
          <img
            src={imagePath}
            alt={`Resume for ${jobTitle} at ${companyName}`}
            className="h-[350px] w-full object-cover object-top max-sm:h-[200px]"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
