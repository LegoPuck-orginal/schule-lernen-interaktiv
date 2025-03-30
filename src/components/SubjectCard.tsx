
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  href: string;
}

const SubjectCard = ({ 
  title, 
  description, 
  icon: Icon,
  colorClass,
  bgClass,
  href
}: SubjectCardProps) => {
  return (
    <Link to={href}>
      <Card className={cn(
        "overflow-hidden card-hover relative h-full border border-border",
        bgClass
      )}>
        <div className="p-6">
          <div className={cn(
            "rounded-full w-12 h-12 flex items-center justify-center mb-4",
            colorClass
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default SubjectCard;
