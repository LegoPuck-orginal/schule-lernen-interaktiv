import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Book, Video, FileText, PenLine, GraduationCap } from 'lucide-react';
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
  // 9th grade Math content
  "quadratic-functions": {
    title: "Quadratische Funktionen",
    subject: "math" as const,
    gradeLevel: "9",
    description: "Lerne alles über quadratische Funktionen, ihre Eigenschaften und Anwendungen.",
    videos: [
      {
        id: "video1",
        title: "Quadratische Funktionen Grundlagen",
        description: "Die Form y = ax² + bx + c und ihre Bedeutung.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Nullstellen quadratischer Funktionen",
        description: "Berechnung von Nullstellen mit der p-q-Formel und Faktorisierung.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video3",
        title: "Scheitelpunktform",
        description: "Umwandlung in die Scheitelpunktform y = a(x-d)² + e.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Welche Normalform hat eine quadratische Funktion?",
        options: ["f(x) = ax + b", "f(x) = ax² + bx + c", "f(x) = a/x", "f(x) = a·b^x"],
        correctAnswer: 1,
        explanation: "Die Normalform einer quadratischen Funktion ist f(x) = ax² + bx + c, wobei a ≠ 0 ist."
      },
      {
        question: "Was beschreibt der Scheitelpunkt einer Parabel?",
        options: ["Den höchsten Punkt der Kurve", "Den tiefsten Punkt der Kurve", "Den höchsten oder tiefsten Punkt der Kurve", "Den Schnittpunkt mit der y-Achse"],
        correctAnswer: 2,
        explanation: "Der Scheitelpunkt ist der höchste Punkt, wenn a < 0 ist, oder der tiefste Punkt, wenn a > 0 ist."
      },
      {
        question: "Wie viele Nullstellen kann eine quadratische Funktion maximal haben?",
        options: ["Eine", "Zwei", "Drei", "Unendlich viele"],
        correctAnswer: 1,
        explanation: "Eine quadratische Funktion kann maximal zwei Nullstellen haben, wenn die Diskriminante b² - 4ac positiv ist."
      },
      {
        question: "Wie lautet die Formel für die Berechnung der Nullstellen?",
        options: ["x = -b/a", "x = (-b ± √(b² - 4ac))/2a", "x = c/a", "x = -c/a"],
        correctAnswer: 1,
        explanation: "Die Formel zur Berechnung der Nullstellen einer quadratischen Funktion lautet x = (-b ± √(b² - 4ac))/2a."
      }
    ]
  },
  "pythagoras": {
    title: "Satz des Pythagoras",
    subject: "math" as const,
    gradeLevel: "9",
    description: "Der fundamentale Satz über rechtwinklige Dreiecke und seine Anwendungen.",
    videos: [
      {
        id: "video1",
        title: "Der Satz des Pythagoras erklärt",
        description: "a² + b² = c² und was das bedeutet.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Anwendungen des Satzes",
        description: "Praktische Anwendungen in Geometrie und Alltag.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Wie lautet der Satz des Pythagoras?",
        options: ["a + b = c", "a · b = c", "a² + b² = c²", "a + b + c = 180°"],
        correctAnswer: 2,
        explanation: "Der Satz des Pythagoras besagt, dass in einem rechtwinkligen Dreieck die Summe der Quadrate der Katheten gleich dem Quadrat der Hypotenuse ist: a² + b² = c²."
      },
      {
        question: "Ein rechtwinkliges Dreieck hat Katheten der Länge 3 cm und 4 cm. Wie lang ist die Hypotenuse?",
        options: ["5 cm", "7 cm", "12 cm", "25 cm"],
        correctAnswer: 0,
        explanation: "Nach dem Satz des Pythagoras gilt: c² = 3² + 4² = 9 + 16 = 25, also c = 5 cm."
      }
    ]
  },
  // Other topics are kept from original data
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
  },
  // 9th grade German content
  "novella": {
    title: "Novellen",
    subject: "german" as const,
    gradeLevel: "9",
    description: "Merkmale, Analyse und Interpretation von Novellen.",
    videos: [
      {
        id: "video1",
        title: "Was ist eine Novelle?",
        description: "Grundlegende Merkmale und Aufbau von Novellen.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Berühmte deutsche Novellen",
        description: "Überblick über wichtige Novellen der deutschen Literatur.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Welches ist KEIN typisches Merkmal einer Novelle?",
        options: ["Unerhörte Begebenheit", "Rahmenhandlung", "Mehrere Haupthandlungsstränge", "Dingsymbol"],
        correctAnswer: 2,
        explanation: "Novellen haben typischerweise einen einzigen Handlungsstrang, nicht mehrere. Mehrere Handlungsstränge sind eher ein Merkmal von Romanen."
      },
      {
        question: "Welche bekannte deutsche Novelle handelt von einem Pferd?",
        options: ["Der Sandmann", "Die Judenbuche", "Michael Kohlhaas", "Der Schimmelreiter"],
        correctAnswer: 2,
        explanation: "Michael Kohlhaas von Heinrich von Kleist handelt von einem Pferdehändler, dessen Pferde unrechtmäßig beschlagnahmt werden, was den Hauptkonflikt der Handlung auslöst."
      }
    ]
  },
  // 9th grade English content
  "tenses-advanced": {
    title: "Fortgeschrittene Zeitformen",
    subject: "english" as const,
    gradeLevel: "9",
    description: "Present Perfect Continuous, Past Perfect und ihre Anwendungen.",
    videos: [
      {
        id: "video1",
        title: "Present Perfect Continuous",
        description: "Bildung und Verwendung des Present Perfect Continuous.",
        videoId: "dQw4w9WgXcQ", 
      },
      {
        id: "video2",
        title: "Past Perfect",
        description: "Wann und wie man das Past Perfect verwendet.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Which sentence uses the Present Perfect Continuous correctly?",
        options: [
          "I am learning English for five years.", 
          "I have been learning English for five years.", 
          "I have learned English for five years.", 
          "I learn English for five years."
        ],
        correctAnswer: 1,
        explanation: "The Present Perfect Continuous is used to express an action that started in the past, continues in the present, and may continue in the future. The correct form is 'have/has been + verb-ing'."
      },
      {
        question: "When should you use the Past Perfect?",
        options: [
          "To talk about something that happened yesterday", 
          "To talk about a habit in the past", 
          "To talk about an action that happened before another past action", 
          "To talk about future plans"
        ],
        correctAnswer: 2,
        explanation: "The Past Perfect (had + past participle) is used to talk about an action that happened before another action in the past."
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
  const is9thGrade = topic.gradeLevel === "9";
  
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
              <div className="flex items-center">
                <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
                {is9thGrade && (
                  <span className="ml-3 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    <GraduationCap className="mr-1 h-4 w-4" /> 9. Klasse
                  </span>
                )}
              </div>
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
