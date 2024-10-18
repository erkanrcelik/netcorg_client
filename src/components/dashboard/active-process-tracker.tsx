import {useEffect, useState} from 'react';
import {useActiveProcess} from "@/services/api/active";

interface ActiveProcessTrackerProps {
  uuid: string;
  start_time: number;
  onDurationChange: (duration: number) => void; // Yeni prop
}

const ActiveProcessTracker = ({ start_time, onDurationChange }: ActiveProcessTrackerProps) => {
  const [duration, setDuration] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { data: processStatus, refetch, isFetching } = useActiveProcess(start_time, true);

  useEffect(() => {
    if (processStatus?.end_time) {
      setIsFinished(true);
    }
  }, [processStatus]);

  useEffect(() => {
    if (!isFinished) {
      const intervalId = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() / 1000) - start_time);
        setDuration(elapsedTime);
        onDurationChange(elapsedTime); // Duration değiştiğinde bildir
        refetch();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isFinished, start_time, refetch, onDurationChange]);

  if (isFinished) return null;

  return (
    <div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

export default ActiveProcessTracker;
