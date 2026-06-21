import { useState } from "react";

export function useChangeStep(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function changeStep(stepIndex, event) {
    if (event) event.preventDefault();
    if (stepIndex < 0 || stepIndex >= steps.length) return;
    setCurrentStepIndex(stepIndex);
  }

  return {
    currentStepIndex,
    currentComponent: steps[currentStepIndex],
    changeStep,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
