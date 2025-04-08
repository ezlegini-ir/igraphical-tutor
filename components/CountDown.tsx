import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface Props {
  minute: number;
  progressBar?: boolean;
}

const CountdownTimer = ({ minute, progressBar = false }: Props) => {
  const totalTime = minute * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const startTime = Date.now();

    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(totalTime - elapsed, 0);
      setTimeLeft(remaining);
    };

    const timer = setInterval(updateTimer, 100);

    return () => clearInterval(timer);
  }, [totalTime]);

  const secondsLeft = Math.floor(timeLeft / 1000);
  const progress = (timeLeft / totalTime) * 100;

  return (
    <div className="flex flex-col gap-1 text-gray-500 text-xs font-medium">
      {secondsLeft > 0 ? (
        <div className="flex justify-between items-center">
          <span>Time Left</span>
          <span className="text-primary">{secondsLeft} Seconds</span>
        </div>
      ) : (
        <Badge variant={"red"} className="font-medium p-1.5">
          Time is Up!
        </Badge>
      )}
      {progressBar && secondsLeft > 0 && (
        <Progress value={progress} className="h-[3px]" />
      )}
    </div>
  );
};

export default CountdownTimer;
