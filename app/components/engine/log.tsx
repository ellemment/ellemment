// 
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const ProcessorLogs = ({ logs }: { logs: any[] }) => {
  // State to track which steps are complete
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  
  // Define the key steps we want to show
  const keySteps = [
    {
      key: "Processing file:",
      display: "Processing file"
    },
    {
      key: "File loaded successfully",
      display: "File loaded successfully"
    },
    {
      key: "Selected column names:",
      display: "Selected columns"
    },
    {
      key: "Dataframe preprocessed",
      display: "Preprocessing complete"
    },
    {
      key: "MoHE is predicting",
      display: "Running predictions"
    },
    {
      key: "Applying attribute mapping",
      display: "Mapping attributes"
    },
    {
      key: "Output files generated",
      display: "Generating output files"
    },
    {
      key: "Excel files also generated",
      display: "Creating Excel files"
    }
  ];

  // Effect to animate checkmarks appearing
  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        const nextStep = keySteps.find(step => !prev.has(step.key));
        if (nextStep) {
          newSet.add(nextStep.key);
        }
        return newSet;
      });
    }, 800); // Adjust timing as needed

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-2 font-mono text-sm">
      {keySteps.map(({ key, display }) => (
        <div
          key={key}
          className="flex items-center gap-3 rounded-md p-2 transition-colors"
        >
          <div className={`
            flex h-5 w-5 items-center justify-center rounded-full
            transition-all duration-300
            ${completedSteps.has(key) 
              ? 'bg-green-500 text-white scale-100' 
              : 'bg-gray-200 scale-90'
            }
          `}>
            <Check className="h-3 w-3" />
          </div>
          <span className={`
            transition-opacity duration-300
            ${completedSteps.has(key) ? 'opacity-100' : 'opacity-50'}
          `}>
            {display}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProcessorLogs;