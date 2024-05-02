import React, { useEffect, useState } from "react";

import { getData } from "../../api/tasksApi.tsx";
import TaskGroup from "./components/TaskGroup/TaskGroup.tsx";

import "./tasks-container.scss";

interface Task {
  description: string;
  value: number;
  checked: boolean;
}

interface Group {
  name: string;
  tasks: Task[];
}

export default function TasksContainer(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groupedTasks, setGroupedTasks] = useState<Group[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [groupedTasks]);

  const fetchData = async (): Promise<void> => {
    setHasError(false);
    setIsLoading(true);
    try {
      const fetchedData: Group[] = await getData();
      setGroupedTasks(fetchedData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setHasError(true);
      console.log(err);
    }
  };

  const handleTaskSelection = (
    updatedTasks: Task[],
    groupName: string
  ): void => {
    setGroupedTasks((prevGroupedTasks: Group[]) => {
      return prevGroupedTasks.map((group: Group) => {
        if (group.name === groupName) {
          return {
            ...group,
            tasks: updatedTasks,
          };
        }
        return group;
      });
    });
  };

  const calculateProgress = (): void => {
    const checkedTasks: Task[] = groupedTasks.reduce(
      (acc: Task[], group: Group) => {
        return acc.concat(group.tasks.filter((task: Task) => task.checked));
      },
      []
    );
    const checkedSum: number = checkedTasks.reduce(
      (acc: number, task: Task) => acc + task.value,
      0
    );
    const totalSum: number = groupedTasks.reduce(
      (acc: number, group: Group) => {
        return (
          acc +
          group.tasks.reduce((sum: number, task: Task) => sum + task.value, 0)
        );
      },
      0
    );

    setProgress(totalSum === 0 ? 0 : (checkedSum / totalSum) * 100);
  };

  const renderProgressBar = (isBlack = false): JSX.Element => {
    return (
      <p
        className={`tasks-container__progress-bar-text ${
          isBlack ? "-is-black" : ""
        }`}
      >
        {Math.round(progress)}%
      </p>
    );
  };

  return (
    <div className="tasks-container">
      {isLoading ? (
        "Loading..."
      ) : hasError ? (
        "An error has occurred"
      ) : (
        <div className="tasks-container__content">
          <h3>Lodgify Grouped Tasks</h3>
          <div className="tasks-container__progress">
            <div
              className="tasks-container__progress-bar"
              style={{
                width: `${progress}%`,
              }}
            >
              {progress > 6 && renderProgressBar()}
            </div>
            {progress < 6 && renderProgressBar(true)}
          </div>
          <div className="tasks-container__groups">
            {groupedTasks.map((group: Group, i: number) => (
              <React.Fragment key={`${group.name}-${i}`}>
                <TaskGroup
                  group={group}
                  handleTaskSelection={handleTaskSelection}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
