import { cn, getScoreStyle } from "~/lib/utils";

const ScoreBadge = ({ score }: { score: number }) => {
  const { badgeColor, textColor, badgeText } = getScoreStyle(score);

  return (
    <div className={cn("badge", badgeColor)}>
      <p className={cn("text-xs font-semibold", textColor)}>{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
