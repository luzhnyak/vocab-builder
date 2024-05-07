import { useEffect } from "react";
import Training from "../components/Training/Training";
import { useWords } from "../store";
import TrainingEmpty from "../components/Training/TrainingEmpty";

const TrainingPage = () => {
  const { tasks, getTasks } = useWords((state) => ({
    tasks: state.tasks,
    getTasks: state.getTasks,
  }));

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <main className="container">
      {tasks.length !== 0 && <Training />}
      {tasks.length === 0 && <TrainingEmpty />}
    </main>
  );
};

export default TrainingPage;
