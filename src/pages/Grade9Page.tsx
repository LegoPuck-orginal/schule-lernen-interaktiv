
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, Calculator, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 9th grade topics data
const grade9Data = {
  math: {
    title: "Mathematik 9. Klasse",
    description: "Wichtige mathematische Konzepte für die 9. Klasse",
    icon: Calculator,
    colorClass: "bg-math",
    topics: [
      { id: "quadratic-functions", title: "Quadratische Funktionen", description: "Nullstellen, Scheitelpunktform und Anwendungen quadratischer Funktionen." },
      { id: "pythagoras", title: "Satz des Pythagoras", description: "Anwendung und Beweise des Satzes des Pythagoras." },
      { id: "probability", title: "Wahrscheinlichkeitsrechnung", description: "Laplace-Experimente und bedingte Wahrscheinlichkeiten." },
    ]
  },
  german: {
    title: "Deutsch 9. Klasse",
    description: "Wichtige Konzepte für den Deutschunterricht der 9. Klasse",
    icon: BookOpen,
    colorClass: "bg-german",
    topics: [
      { id: "novella", title: "Novellen", description: "Analyse und Interpretation von Novellen." },
      { id: "argumentation", title: "Erörterung", description: "Aufbau und Strukturierung von Erörterungen." },
      { id: "drama", title: "Drama", description: "Grundelemente des Dramas und wichtige Dramenwerke." },
    ]
  },
  english: {
    title: "Englisch 9. Klasse",
    description: "Wichtige Konzepte für den Englischunterricht der 9. Klasse",
    icon: Globe,
    colorClass: "bg-english",
    topics: [
      { id: "tenses-advanced", title: "Fortgeschrittene Zeitformen", description: "Present Perfect Continuous und Past Perfect." },
      { id: "text-analysis", title: "Textanalyse", description: "Methoden zur Analyse englischer Texte." },
      { id: "usa-culture", title: "Amerikanische Kultur", description: "Wichtige Aspekte der amerikanischen Kultur und Geschichte." },
    ]
  }
};

const Grade9Page = () => {
  const [activeSubject, setActiveSubject] = useState("math");
  
  const currentSubjectData = grade9Data[activeSubject as keyof typeof grade9Data];
  const SubjectIcon = currentSubjectData.icon;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-100 to-purple-100">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">9. Klasse Lernmaterialien</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Speziell zusammengestellte Inhalte für Hamburger Schülerinnen und Schüler der 9. Klasse.
                Interaktive Übungen und SimpleClub Videos zu allen wichtigen Themen.
              </p>
            </div>
          </div>
        </section>
        
        {/* Subject Tabs */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <Tabs 
              defaultValue="math" 
              value={activeSubject}
              onValueChange={setActiveSubject}
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="math">Mathematik</TabsTrigger>
                <TabsTrigger value="german">Deutsch</TabsTrigger>
                <TabsTrigger value="english">Englisch</TabsTrigger>
              </TabsList>
              
              {Object.keys(grade9Data).map((subject) => (
                <TabsContent key={subject} value={subject} className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-full ${grade9Data[subject as keyof typeof grade9Data].colorClass} flex items-center justify-center`}>
                      {React.createElement(grade9Data[subject as keyof typeof grade9Data].icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{grade9Data[subject as keyof typeof grade9Data].title}</h2>
                      <p className="text-muted-foreground">
                        {grade9Data[subject as keyof typeof grade9Data].description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grade9Data[subject as keyof typeof grade9Data].topics.map((topic) => (
                      <Card key={topic.id} className="card-hover h-full">
                        <CardHeader>
                          <CardTitle>{topic.title}</CardTitle>
                          <CardDescription>{topic.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link 
                            to={`/subject/${subject}/topic/${topic.id}`}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                          >
                            Zum Thema <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Grade9Page;
