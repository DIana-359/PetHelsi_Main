import React from "react";

interface Step {
  label: string;
  status: "completed" | "active" | "upcoming";
}

const Stepper: React.FC<{ steps: Step[] }> = ({ steps }) => {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center relative">
              {/* Кружок */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10
                  ${
                    step.status === "completed"
                      ? "bg-blue-500 border-blue-500 text-white"
                      : step.status === "active"
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
              >
                {step.status === "completed" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Название шага */}
              <span
                className={`mt-2 text-sm font-medium ${
                  step.status === "active"
                    ? "text-blue-500"
                    : step.status === "completed"
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Линия между кружками */}
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-300 mb-6
                  ${
                    step.status === "completed"
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;