import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

import { getScoreStyle } from "~/lib/utils";

const Category = ({ title, score }: { title: string; score: number }) => {
  const { labelColor } = getScoreStyle(score);

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl">
          <span className={labelColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  const categories = [
    { title: "Tone & Style", score: feedback.toneAndStyle.score },
    { title: "Content", score: feedback.content.score },
    { title: "Structure", score: feedback.structure.score },
    { title: "Skills", score: feedback.skills.score },
  ];

  return (
    <div className="w-full rounded-2xl bg-white shadow-md">
      <div className="flex flex-row items-center gap-8 p-4 max-sm:flex-col">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      {categories.map((category, index) => (
        <Category key={index} title={category.title} score={category.score} />
      ))}
    </div>
  );
};

export default Summary;
