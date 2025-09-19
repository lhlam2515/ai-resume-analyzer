import { cn, getScoreStyle } from "~/lib/utils";

interface ScoreBadgeProps {
  score: number;
  variant?: "label" | "score";
}

export const ScoreBadge = ({ score, variant = "label" }: ScoreBadgeProps) => {
  const { badgeLabel, badgeColor, textColor, labelColor } =
    getScoreStyle(score);
  const scoreIcon = score > 69 ? "/icons/check.svg" : "/icons/warning.svg";

  return (
    <div className={cn("score-badge", badgeColor)}>
      {variant === "label" ? (
        <p className={cn("text-xs font-semibold", labelColor)}>{badgeLabel}</p>
      ) : (
        <>
          <img src={scoreIcon} alt="score" className="size-4" />
          <p className={cn("text-sm font-medium", textColor)}>{score}/100</p>
        </>
      )}
    </div>
  );
};

export default ScoreBadge;
