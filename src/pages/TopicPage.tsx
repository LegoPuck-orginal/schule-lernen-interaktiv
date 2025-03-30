
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Book, Video, FileText, PenLine } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import ExerciseCard from '@/components/ExerciseCard';

// Mock data for topics
const topicData = {
  // Math
  "decimals": {
    title: "Dezimalzahlen",
    subject: "math" as const,
    gradeLevel: "5",
    description: "Lerne alles über Dezimalzahlen und wie man mit ihnen rechnet.",
    videos: [
      {
        id: "video1",
        title: "Einführung in Dezimalzahlen",
        description: "Grundlagen der Dezimalzahlen verstehen.",
        videoId: "dQw4w9WgXcQ", // This is a placeholder, replace with actual SimpleClub video ID
      },
      {
        id: "video2",
        title: "Rechnen mit Dezimalzahlen",
        description: "Addition, Subtraktion, Multiplikation und Division von Dezimalzahlen.",
        videoId: "dQw4w9WgXcQ", // This is a placeholder, replace with actual SimpleClub video ID
      }
    ],
    exercises: [
      {
        question: "Welches ist der Dezimalwert von 3/10?",
        options: ["0,3", "0,33", "3,0", "0,03"],
        correctAnswer: 0,
        explanation: "Der Bruch 3/10 als Dezimalzahl ist 0,3, da 3 geteilt durch 10 gleich 0,3 ist."
      },
      {
        question: "Was ist das Ergebnis von 0,7 + 0,35?",
        options: ["1,05", "0,42", "0,105", "1,5"],
        correctAnswer: 0,
        explanation: "0,7 + 0,35 = 1,05. Beim Addieren von Dezimalzahlen müssen die Dezimalstellen richtig ausgerichtet werden."
      },
      {
        question: "Was ist 1,5 × 0,2?",
        options: ["0,3", "0,03", "3", "0,35"],
        correctAnswer: 0,
        explanation: "1,5 × 0,2 = 0,3. Bei der Multiplikation von Dezimalzahlen multipliziert man wie bei ganzen Zahlen und platziert das Dezimalzeichen entsprechend der Summe der Dezimalstellen in den Faktoren."
      }
    ]
  },
  // German
  "grammar": {
    title: "Grundlegende Grammatik",
    subject: "german" as const,
    gradeLevel: "5",
    description: "Lerne die grundlegenden Grammatikregeln im Deutschen.",
    videos: [
      {
        id: "video1",
        title: "Wortarten verstehen",
        description: "Nomen, Verben, Adjektive und andere Wortarten im Deutschen.",
        videoId: "dQw4w9WgXcQ", // This is a placeholder, replace with actual SimpleClub video ID
      },
      {
        id: "video2",
        title: "Satzglieder und Satzaufbau",
        description: "Die Struktur deutscher Sätze verstehen.",
        videoId: "dQw4w9WgXcQ", // This is a placeholder, replace with actual SimpleClub video ID
      }
    ],
    exercises: [
      {
        question: "Welches Wort ist ein Nomen?",
        options: ["spielen", "Haus", "schnell", "weil"],
        correctAnswer: 1,
        explanation: "Ein Nomen (auch Substantiv genannt) bezeichnet Personen, Tiere, Pflanzen, Gegenstände oder Ideen. 'Haus' ist ein Nomen."
      },
      {
        question: "Welches ist kein Adjektiv?",
        options: ["glücklich", "groß", "rennen", "blau"],
        correctAnswer: 2,
        explanation: "'Rennen' ist kein Adjektiv, sondern ein Verb. Adjektive beschreiben Eigenschaften von Nomen."
      },
      {
        question: "Welcher Satz verwendet das Verb im Präsens?",
        options: ["Er wird morgen kommen.", "Sie hat gestern gespielt.", "Wir gehen heute ins Kino.", "Sie war sehr müde."],
        correctAnswer: 2,
        explanation: "'Wir gehen heute ins Kino' verwendet das Verb 'gehen' im Präsens. Das Präsens beschreibt Handlungen in der Gegenwart."
      }
    ]
  },
  // English
  "basics": {
    title: "Englische Grundlagen",
    subject: "english" as const,
    gradeLevel: "5",
    description: "Lerne die Grundlagen der englischen Sprache.",
    videos: [
      {
        id: "video1",
        title: "Englische Begrüßungen und Vorstellungen",
        description: "Wie man sich auf Englisch vorstellt und begrüßt.",
        videoId: "dQw4w9WgXcQ", // This is a placeholder, replace with actual SimpleClub video ID
      },
      {
        id: "video2",
        title: "Englische Zahlen und Farben",
        description: "Die wichtigsten Zahlen und Farben auf Englisch.",
        videoId: "dQw4w9WgXcQ", // This is a placeholder, replace with actual SimpleClub video ID
      }
    ],
    exercises: [
      {
        question: "What is the correct greeting for the morning?",
        options: ["Good afternoon", "Good evening", "Good morning", "Good night"],
        correctAnswer: 2,
        explanation: "'Good morning' is the correct greeting to use in the morning hours."
      },
      {
        question: "How do you say 'rot' in English?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correctAnswer: 2,
        explanation: "'Red' is the English word for 'rot'."
      },
      {
        question: "What is the correct translation for 'Ich heiße Thomas'?",
        options: ["My name Thomas", "I am Thomas", "My name is Thomas", "I Thomas"],
        correctAnswer: 2,
        explanation: "'My name is Thomas' is the correct translation for 'Ich heiße Thomas'."
      }
    ]
  }
};

const TopicPage = () => {
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();
  const [activeTab, setActiveTab] = useState("videos");
  
  // Safety check for valid topic
  if (!topicId || !topicData[topicId as keyof typeof topicData]) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container px-4 md:px-6 py-12">
          <div className="text-center">
            <h1 className="mb-4">Thema nicht gefunden</h1>
            <p className="text-muted-foreground mb-8">
              Das von dir gesuchte Thema existiert leider nicht.
            </p>
            <Button asChild>
              <Link to={`/subject/${subject}`}>Zurück zur Fachübersicht</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const topic = topicData[topicId as keyof typeof topicData];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`py-12 bg-${topic.subject}/10`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-fit" 
                asChild
              >
                <Link to={`/subject/${subject}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück zu {subject === 'math' ? 'Mathematik' : subject === 'german' ? 'Deutsch' : 'Englisch'}
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
              <p className="text-muted-foreground text-lg">
                Klasse {topic.gradeLevel} | {topic.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Content Tabs */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <Tabs 
              defaultValue="videos" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-8"
            >
              <TabsList className="grid grid-cols-3 md:w-[400px]">
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span>Videos</span>
                </TabsTrigger>
                <TabsTrigger value="exercises" className="flex items-center gap-2">
                  <PenLine className="h-4 w-4" />
                  <span>Übungen</span>
                </TabsTrigger>
                <TabsTrigger value="materials" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Material</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Videos Tab */}
              <TabsContent value="videos" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topic.videos.map((video) => (
                    <VideoPlayer
                      key={video.id}
                      title={video.title}
                      description={video.description}
                      videoId={video.videoId}
                    />
                  ))}
                </div>
              </TabsContent>
              
              {/* Exercises Tab */}
              <TabsContent value="exercises" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topic.exercises.map((exercise, index) => (
                    <ExerciseCard
                      key={index}
                      question={exercise.question}
                      options={exercise.options}
                      correctAnswer={exercise.correctAnswer}
                      explanation={exercise.explanation}
                      subject={topic.subject}
                    />
                  ))}
                </div>
              </TabsContent>
              
              {/* Learning Materials Tab */}
              <TabsContent value="materials" className="space-y-4">
                <div className="rounded-lg bg-muted p-8 text-center">
                  <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Lernmaterialien werden bald verfügbar sein</h3>
                  <p className="text-muted-foreground mb-6">
                    Wir arbeiten daran, zusätzliche Lernmaterialien für dieses Thema bereitzustellen. 
                    Schaue bald wieder vorbei!
                  </p>
                  <Button onClick={() => setActiveTab("videos")}>
                    Zurück zu den Videos
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicPage;
