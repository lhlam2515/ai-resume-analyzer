import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import ScoreBadge from "./ScoreBadge";

import { cn } from "~/lib/utils";

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row items-center gap-4 py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} variant="score" />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="grid w-full grid-cols-2 gap-4 rounded-lg bg-gray-50 px-5 py-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row items-center gap-2" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="score"
              className="size-5"
            />
            <p className="text-xl text-gray-500">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4",
              tip.type === "good"
                ? "border border-green-200 bg-green-50 text-green-700"
                : "border border-yellow-200 bg-yellow-50 text-yellow-700",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="score"
                className="size-5"
              />
              <p className="text-xl font-semibold">{tip.tip}</p>
            </div>
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const categories = [
    { title: "Tone & Style", data: feedback.toneAndStyle },
    { title: "Content", data: feedback.content },
    { title: "Structure", data: feedback.structure },
    { title: "Skills", data: feedback.skills },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <Accordion>
        {categories.map((category, index) => (
          <AccordionItem id={`item-${index}`} key={index}>
            <AccordionHeader itemId={`item-${index}`}>
              <CategoryHeader
                title={category.title}
                categoryScore={category.data.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={`item-${index}`}>
              <CategoryContent tips={category.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
