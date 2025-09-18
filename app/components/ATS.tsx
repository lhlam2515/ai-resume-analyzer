import { cn, getScoreStyle } from "~/lib/utils";

interface ATSProps {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  const { bgGradient, atsIcon } = getScoreStyle(score);

  return (
    <div
      className={cn(
        "to-light-white flex w-full flex-col gap-4 rounded-2xl bg-gradient-to-b p-8 shadow-md",
        bgGradient,
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <img src={atsIcon} alt="ATS" className="h-10 w-10" />
        <h2 className="text-2xl font-semibold text-black">
          ATS Score - {score}/100
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-medium">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-lg text-gray-500">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>
        {suggestions.map((suggestion, index) => (
          <div className="flex flex-row items-center gap-2" key={index}>
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="ATS"
              className="h-4 w-4"
            />
            <p className="text-lg text-gray-500">{suggestion.tip}</p>
          </div>
        ))}
        <p className="text-lg text-gray-500">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
