
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Calculator, Globe, GraduationCap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GradeSelector from '@/components/GradeSelector';

// Mock data for subjects
const subjectData = {
  math: {
    title: "Mathematik",
    description: "Mathematische Konzepte einfach verstehen",
    icon: Calculator,
    colorClass: "bg-math",
    topics: {
      "5": [
        { id: "decimals", title: "Dezimalzahlen", description: "Grundlagen der Dezimalzahlen und Rechenoperationen." },
        { id: "geometry", title: "Geometrische Grundformen", description: "Entdecke Dreiecke, Vierecke und Kreise." },
        { id: "fractions", title: "Bruchrechnung", description: "Einführung in die Bruchrechnung." },
      ],
      "6": [
        { id: "percentages", title: "Prozentrechnung", description: "Prozentrechnung verstehen und anwenden." },
        { id: "algebra", title: "Einfache Gleichungen", description: "Erste Schritte mit Variablen und Gleichungen." },
        { id: "data", title: "Daten und Häufigkeiten", description: "Daten sammeln, darstellen und auswerten." },
      ],
      "9": [
        { id: "quadratic-functions", title: "Quadratische Funktionen", description: "Nullstellen, Scheitelpunktform und Anwendungen quadratischer Funktionen." },
        { id: "pythagoras", title: "Satz des Pythagoras", description: "Anwendung und Beweise des Satzes des Pythagoras." },
        { id: "linear-functions", title: "Lineare Funktionen", description: "Verstehe lineare Funktionen, ihre Eigenschaften und Anwendungen." },
        { id: "polynomials", title: "Polynome und Polynomdivision", description: "Verstehe Polynome, ihre Eigenschaften und lerne die Polynomdivision." },
        { id: "probability", title: "Wahrscheinlichkeitsrechnung", description: "Grundlagen der Wahrscheinlichkeitsrechnung und ihre Anwendungen." },
      ],
      // Add more grades...
    }
  },
  german: {
    title: "Deutsch",
    description: "Grammatik, Rechtschreibung und Literatur",
    icon: BookOpen,
    colorClass: "bg-german",
    topics: {
      "5": [
        { id: "grammar", title: "Grundlegende Grammatik", description: "Wortarten und einfache Satzstrukturen verstehen." },
        { id: "spelling", title: "Rechtschreibung", description: "Die wichtigsten Rechtschreibregeln." },
        { id: "reading", title: "Lesetraining", description: "Texte verstehen und zusammenfassen." },
      ],
      "6": [
        { id: "texts", title: "Textsorten", description: "Verschiedene Textsorten kennenlernen und schreiben." },
        { id: "narration", title: "Erzähltechniken", description: "Spannende Geschichten schreiben." },
        { id: "poetry", title: "Gedichte", description: "Einfache Gedichte verstehen und interpretieren." },
      ],
      "9": [
        { id: "novella", title: "Novellen", description: "Analyse und Interpretation von Novellen." },
        { id: "argumentation", title: "Erörterung", description: "Aufbau und Strukturierung von Erörterungen." },
        { id: "drama", title: "Drama", description: "Grundelemente des Dramas und wichtige Dramenwerke." },
      ],
      // Add more grades...
    }
  },
  english: {
    title: "Englisch",
    description: "Vokabeln, Grammatik und Konversation",
    icon: Globe,
    colorClass: "bg-english",
    topics: {
      "5": [
        { id: "basics", title: "Grundlagen", description: "Erste Schritte mit der englischen Sprache." },
        { id: "vocabulary", title: "Grundwortschatz", description: "Die wichtigsten englischen Wörter lernen." },
        { id: "simple-sentences", title: "Einfache Sätze", description: "Erste Sätze bilden und verstehen." },
      ],
      "6": [
        { id: "tenses", title: "Zeiten", description: "Present Simple und Present Continuous." },
        { id: "conversation", title: "Konversation", description: "Einfache Gespräche führen." },
        { id: "countries", title: "Länder und Kulturen", description: "Über verschiedene Länder sprechen." },
      ],
      "9": [
        { id: "tenses-advanced", title: "Fortgeschrittene Zeitformen", description: "Present Perfect Continuous und Past Perfect." },
        { id: "text-analysis", title: "Textanalyse", description: "Methoden zur Analyse englischer Texte." },
        { id: "usa-culture", title: "Amerikanische Kultur", description: "Wichtige Aspekte der amerikanischen Kultur und Geschichte." },
      ],
      // Add more grades...
    }
  }
};

const SubjectPage = () => {
  const { subject } = useParams<{ subject: string }>();
  const [selectedGrade, setSelectedGrade] = useState("9"); // Default to 9th grade
  
  // Safety check to make sure the subject exists
  const validSubject = subject as keyof typeof subjectData;
  if (!subjectData[validSubject]) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container px-4 md:px-6 py-12">
          <div className="text-center">
            <h1 className="mb-4">Fach nicht gefunden</h1>
            <p className="text-muted-foreground mb-8">
              Das von dir gesuchte Fach existiert leider nicht.
            </p>
            <Button asChild>
              <Link to="/">Zurück zur Startseite</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const currentSubject = subjectData[validSubject];
  const SubjectIcon = currentSubject.icon;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`py-12 bg-${validSubject}/10`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${currentSubject.colorClass} flex items-center justify-center`}>
                <SubjectIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{currentSubject.title}</h1>
                <p className="text-muted-foreground text-lg mt-2">
                  {currentSubject.description}
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline">
                    <Link to="/grade9">
                      Alle 9. Klasse Inhalte anzeigen
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <GradeSelector
                  selectedGrade={selectedGrade}
                  onGradeChange={setSelectedGrade}
                  className="sticky top-24"
                />
              </div>
              
              {/* Content */}
              <div className="md:col-span-3">
                <div className="flex items-center mb-6">
                  <GraduationCap className="mr-2 h-5 w-5 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold">Klasse {selectedGrade} - Themen</h2>
                  {selectedGrade === "9" && (
                    <span className="ml-3 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Empfohlen
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSubject.topics[selectedGrade as keyof typeof currentSubject.topics]?.map((topic) => (
                    <Card key={topic.id} className={`card-hover h-full ${selectedGrade === "9" ? "border-2 border-green-200" : ""}`}>
                      <CardHeader>
                        <CardTitle>{topic.title}</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full">
                          <Link to={`/subject/${validSubject}/topic/${topic.id}`}>
                            Zum Thema <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {!currentSubject.topics[selectedGrade as keyof typeof currentSubject.topics] && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">
                      Inhalte für Klasse {selectedGrade} werden bald verfügbar sein
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Wir arbeiten daran, weitere Themen für diese Klassenstufe bereitzustellen.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/">Zurück zur Startseite</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubjectPage;
