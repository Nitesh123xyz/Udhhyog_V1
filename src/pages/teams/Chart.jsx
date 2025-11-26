import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TaskAccordion = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: "unassigned",
      title: "Unassigned",
      color: "bg-blue-100",
      borderColor: "border-blue-400",
    },
    {
      id: "raje",
      title: "Raje",
      color: "bg-green-100",
      borderColor: "border-green-400",
    },
    {
      id: "punchuri",
      title: "Punchuri",
      color: "bg-purple-100",
      borderColor: "border-purple-400",
    },
    {
      id: "dolphin",
      title: "Dolphin",
      color: "bg-orange-100",
      borderColor: "border-orange-400",
    },
    {
      id: "confirm",
      title: "Confirm",
      color: "bg-pink-100",
      borderColor: "border-pink-400",
    },
  ];

  const toggleSection = (id) => {
    if (id === "unassigned") return;
    setOpenSection(openSection === id ? null : id);
  };

  const isOpen = (id) => {
    return id === "unassigned" || openSection === id;
  };

  return (
    <div className="h-screen bg-gray-100 p-4 overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Task Management
      </h1>

      <div className="flex h-[calc(100vh-8rem)] gap-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`border-2 ${
              section.borderColor
            } rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen(section.id) ? "flex-1" : "w-16 md:w-20"
            } flex flex-col`}
          >
            {/* Header */}
            <div
              onClick={() => toggleSection(section.id)}
              className={`${
                section.color
              } h-full flex items-center justify-center ${
                section.id !== "unassigned"
                  ? "cursor-pointer hover:opacity-80"
                  : ""
              } transition-opacity relative`}
            >
              {/* Collapsed state - vertical text */}
              {!isOpen(section.id) && (
                <div className="flex flex-col items-center">
                  <h2 className="text-sm md:text-base font-semibold text-gray-800 writing-mode-vertical transform -rotate-180 whitespace-nowrap">
                    {section.title}
                  </h2>
                  {section.id !== "unassigned" && (
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 mt-2" />
                  )}
                </div>
              )}

              {/* Expanded state */}
              {isOpen(section.id) && (
                <div className="w-full h-full flex flex-col">
                  {/* Section header */}
                  <div className="p-4 border-b-2 border-gray-300 flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                      {section.title}
                    </h2>
                    {section.id !== "unassigned" && (
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                    )}
                  </div>

                  {/* Content area */}
                  <div className="flex-1 bg-white p-4 overflow-y-auto">
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((task) => (
                        <div
                          key={task}
                          className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <p className="text-sm md:text-base text-gray-700 font-medium">
                            Task {task}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Sample task description for {section.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskAccordion;
