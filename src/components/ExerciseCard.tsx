
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseCardProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: 'math' | 'german' | 'english';
}

const ExerciseCard = ({ 
  question, 
  options, 
  correctAnswer, 
  explanation,
  subject
}: ExerciseCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    if (selectedOption === null) {
      setSelectedOption(index);
    }
  };
  
  const handleShowExplanation = () => {
    setShowExplanation(true);
  };
  
  const resetExercise = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };
  
  const getSubjectColor = () => {
    switch (subject) {
      case 'math': return 'bg-math/10 border-math/20';
      case 'german': return 'bg-german/10 border-german/20';
      case 'english': return 'bg-english/10 border-english/20';
      default: return '';
    }
  };
  
  return (
    <Card className={cn(
      "overflow-hidden", 
      getSubjectColor(),
      selectedOption !== null && "border-2"
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "w-full justify-start text-left h-auto py-3 px-4",
                selectedOption === index && index === correctAnswer && "border-green-500 bg-green-50 text-green-900",
                selectedOption === index && index !== correctAnswer && "border-red-500 bg-red-50 text-red-900"
              )}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
            >
              <div className="flex items-center gap-3">
                {selectedOption === index && index === correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                )}
                {selectedOption === index && index !== correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
                {(selectedOption !== index || selectedOption === null) && (
                  <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </div>
                )}
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>
        
        {selectedOption !== null && (
          <div className={cn(
            "p-4 rounded-md mt-4",
            selectedOption === correctAnswer ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
          )}>
            {selectedOption === correctAnswer ? (
              <p className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Richtig!</span>
              </p>
            ) : (
              <p className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Falsch. Die richtige Antwort ist: {options[correctAnswer]}</span>
              </p>
            )}
            
            {showExplanation && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-sm">{explanation}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {selectedOption !== null && !showExplanation && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShowExplanation}
            className="flex items-center gap-1"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Erklärung</span>
          </Button>
        )}
        
        {selectedOption !== null && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={resetExercise}
            className="ml-auto"
          >
            Zurücksetzen
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
