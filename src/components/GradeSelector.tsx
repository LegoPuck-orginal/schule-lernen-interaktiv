
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GradeSelectorProps {
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
  className?: string;
}

const GradeSelector = ({ selectedGrade, onGradeChange, className }: GradeSelectorProps) => {
  // Group grades by school level
  const grades = {
    "Unter- und Mittelstufe": ["5", "6", "7", "8", "9", "10"],
    "Oberstufe": ["11", "12", "13"]
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium">Klassenstufe wählen</h3>
      
      {Object.entries(grades).map(([level, gradeList]) => (
        <div key={level} className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">{level}</h4>
          <div className="flex flex-wrap gap-2">
            {gradeList.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                size="sm"
                onClick={() => onGradeChange(grade)}
                className={cn(
                  selectedGrade === grade ? "bg-primary text-white" : "",
                  grade === "9" ? "relative" : ""
                )}
              >
                {grade}
                {grade === "9" && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                    ✓
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradeSelector;
