import React, { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { LiaClipboardListSolid } from "react-icons/lia";

interface Task {
  description: string;
  value: number;
  checked: boolean;
}

interface Group {
  name: string;
  tasks: Task[];
}

interface TaskGroupProps {
  group: Group;
  handleTaskSelection: (updatedTasks: Task[], groupName: string) => void;
}

const TaskGroup: React.FC<TaskGroupProps> = ({
  group,
  handleTaskSelection,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleTaskSelection = (taskIndex: number): void => {
    const updatedTasks = [...group.tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      checked: !updatedTasks[taskIndex].checked,
    };
    handleTaskSelection(updatedTasks, group.name);
  };

  return (
    <div className="tasks-container__group">
      <div
        className={`tasks-container__group-title ${
          group.tasks.every((task) => task.checked) ? "-is-completed" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <LiaClipboardListSolid />
          {group.name}
        </div>
        {isExpanded ? (
          <div>
            <span>Hide</span>
            <FaChevronUp size={12} color="#000" />
          </div>
        ) : (
          <div>
            <span>Show</span>
            <FaChevronDown size={12} color="#000" />
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="tasks-container__group-tasks">
          {group.tasks.map((task, index) => (
            <div
              key={task.description}
              onClick={() => toggleTaskSelection(index)}
            >
              {task.checked ? (
                <MdCheckBox
                  color="#55b99d"
                  style={{ minWidth: 20 }}
                  size={20}
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  color="#aaacaa"
                  style={{ minWidth: 20 }}
                  size={20}
                />
              )}
              {task.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskGroup;
