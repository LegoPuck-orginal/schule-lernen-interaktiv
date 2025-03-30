
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Book, Video, FileText, PenLine, GraduationCap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import ExerciseCard from '@/components/ExerciseCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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
      },
      {
        question: "Welche der folgenden Zahlentripel bildet ein pythagoreisches Tripel (a, b, c)?",
        options: ["(3, 4, 5)", "(5, 6, 7)", "(5, 12, 13)", "(8, 15, 23)"],
        correctAnswer: 2,
        explanation: "Ein pythagoreisches Tripel muss die Bedingung a² + b² = c² erfüllen. Für (5, 12, 13) gilt: 5² + 12² = 25 + 144 = 169 = 13²."
      },
      {
        question: "Ein 15 Meter hoher Baum wirft bei einem bestimmten Sonnenstand einen 8 Meter langen Schatten. Wie weit ist die Sonne vom Baumwipfel entfernt (angenommen, die Erde ist flach)?",
        options: ["17 m", "23 m", "7 m", "15,8 m"],
        correctAnswer: 0,
        explanation: "Die Distanz kann mit dem Satz des Pythagoras berechnet werden: √(15² + 8²) = √(225 + 64) = √289 = 17 m."
      },
      {
        question: "Ein Feuerwehrmann stellt eine 10 Meter lange Leiter an eine Wand. Der Fuß der Leiter ist 6 Meter von der Wand entfernt. Wie hoch reicht die Leiter an der Wand hinauf?",
        options: ["4 m", "8 m", "8,94 m", "7,5 m"],
        correctAnswer: 1,
        explanation: "Wir verwenden den Satz des Pythagoras: a² + b² = c². Hier ist c = 10 m und b = 6 m. Somit ist a² = 10² - 6² = 100 - 36 = 64, also a = 8 m."
      },
      {
        question: "In welchem der folgenden Dreiecke mit den Seitenlängen a, b und c können wir sicher sein, dass es sich um ein rechtwinkliges Dreieck handelt?",
        options: ["a = 7, b = 24, c = 25", "a = 5, b = 9, c = 14", "a = 6, b = 8, c = 10", "a = 15, b = 20, c = 25"],
        correctAnswer: 0,
        explanation: "Für ein rechtwinkliges Dreieck muss der Satz des Pythagoras gelten: a² + b² = c². Für a = 7, b = 24, c = 25 gilt: 7² + 24² = 49 + 576 = 625 = 25²."
      },
      {
        question: "Ein Flugzeug fliegt von Hamburg nach München (Distanz 612 km). Dabei erreicht es eine Höhe von 10.000 Meter. Wie weit ist das Flugzeug auf der direkten Linie von Hamburg nach München entfernt (Luftlinie)?",
        options: ["622 km", "612,08 km", "602 km", "620 km"],
        correctAnswer: 1,
        explanation: "Mit dem Satz des Pythagoras: d = √(612² + 10²) = √(374544 + 100) = √374644 ≈ 612,08 km. Die Höhe ist im Vergleich zur horizontalen Distanz so gering, dass sie kaum einen Unterschied macht."
      },
      {
        question: "Eine Leiter steht an einer Wand. Ihre Länge beträgt 5 Meter. Der Abstand des Fußes der Leiter zur Wand beträgt 3 Meter. Ein Arbeiter steigt die Leiter bis zu einer Höhe von 2,5 Metern hinauf. Wie weit ist der Arbeiter vom Fußpunkt der Leiter entfernt?",
        options: ["1,5 m", "2 m", "3 m", "5,5 m"],
        correctAnswer: 0,
        explanation: "Die Höhe der Leiter an der Wand beträgt 4 m (berechnet mit dem Satz des Pythagoras). Der Arbeiter ist bei 2,5 m Höhe. Mit dem Strahlensatz können wir berechnen, dass der horizontale Abstand 3 · (2,5/4) = 1,875 m beträgt. Mit dem Satz des Pythagoras ist die direkte Entfernung dann √(2,5² + 1,875²) = √(6,25 + 3,52) ≈ 3,13 m vom Fußpunkt der Wand bzw. 1,5 m vom Fußpunkt der Leiter."
      },
      {
        question: "Wie beweist man den Satz des Pythagoras?",
        options: ["Durch Messung verschiedener Dreiecke", "Durch algebraische Umformung von a + b = c", "Durch geometrische Konstruktionen mit Quadraten über den Seiten", "Der Satz kann nicht bewiesen werden, er ist ein Axiom"],
        correctAnswer: 2,
        explanation: "Es gibt über 350 Beweise des Satzes des Pythagoras. Viele davon nutzen geometrische Konstruktionen, bei denen Quadrate über den Seiten des rechtwinkligen Dreiecks gezeichnet und verglichen werden."
      },
      {
        question: "Wenn a = 6 und c = 10 in einem rechtwinkligen Dreieck, wie groß ist dann b?",
        options: ["4", "8", "16", "8,72"],
        correctAnswer: 1,
        explanation: "Nach dem Satz des Pythagoras gilt a² + b² = c². Umgestellt nach b: b² = c² - a² = 10² - 6² = 100 - 36 = 64, also b = 8."
      },
      {
        question: "Ein Fußballspieler steht 20 Meter vom Tor entfernt und 15 Meter seitlich verschoben. Wie weit ist er direkt vom Tor entfernt?",
        options: ["25 m", "35 m", "23 m", "5 m"],
        correctAnswer: 0,
        explanation: "Die direkte Entfernung berechnet sich mit dem Satz des Pythagoras: d = √(20² + 15²) = √(400 + 225) = √625 = 25 m."
      },
      {
        question: "Welches ist die Umkehrung des Satzes des Pythagoras?",
        options: ["Wenn a² + b² = c², dann ist das Dreieck rechtwinklig", "Wenn a² + b² ≠ c², dann ist das Dreieck nicht rechtwinklig", "Wenn das Dreieck rechtwinklig ist, dann gilt a² + b² = c²", "Wenn a² = b² + c², dann ist das Dreieck gleichseitig"],
        correctAnswer: 0,
        explanation: "Die Umkehrung des Satzes des Pythagoras besagt: Wenn in einem Dreieck die Summe der Quadrate zweier Seiten gleich dem Quadrat der dritten Seite ist (a² + b² = c²), dann ist das Dreieck rechtwinklig."
      },
      {
        question: "In welchem Jahr wurde der Satz des Pythagoras entdeckt?",
        options: ["Um 500 v. Chr.", "Um 300 v. Chr.", "Um 100 n. Chr.", "Der genaue Zeitpunkt ist unbekannt"],
        correctAnswer: 3,
        explanation: "Der genaue Zeitpunkt der Entdeckung ist unbekannt. Obwohl der Satz nach Pythagoras benannt ist (um 570-510 v. Chr.), war er bereits in früheren Kulturen wie Babylon und Ägypten bekannt."
      },
      {
        question: "Wie lässt sich der Satz des Pythagoras auf dreidimensionale Probleme erweitern?",
        options: ["Er ist nicht auf 3D-Probleme anwendbar", "a³ + b³ + c³ = d³", "a² + b² + c² = d²", "Eine Erweiterung ist nicht nötig"],
        correctAnswer: 2,
        explanation: "Für dreidimensionale Probleme gilt: Die Quadratsumme der drei Raumkoordinaten ergibt das Quadrat der räumlichen Distanz: a² + b² + c² = d²."
      },
      {
        question: "Ein Schiff fährt 8 km nach Osten und dann 6 km nach Norden. Wie weit ist es vom Ausgangspunkt entfernt?",
        options: ["14 km", "2 km", "10 km", "48 km"],
        correctAnswer: 2,
        explanation: "Die direkte Entfernung vom Ausgangspunkt berechnet sich mit dem Satz des Pythagoras: d = √(8² + 6²) = √(64 + 36) = √100 = 10 km."
      },
      {
        question: "Ein Tisch ist 80 cm hoch, 120 cm breit und 160 cm lang. Wie lang ist die Diagonale von einer Ecke zur gegenüberliegenden Ecke durch den Raum?",
        options: ["360 cm", "240 cm", "216 cm", "180 cm"],
        correctAnswer: 2,
        explanation: "Für die Raumdiagonale verwenden wir die dreidimensionale Erweiterung des Satzes des Pythagoras: d = √(160² + 120² + 80²) = √(25600 + 14400 + 6400) = √46400 = 216 cm."
      },
      {
        question: "Ein Dreieck hat die Seitenlängen 13, 13 und 10. Ist es rechtwinklig?",
        options: ["Ja, weil zwei Seiten gleich sind", "Ja, weil 13² + 13² = 10²", "Nein, weil 13² + 13² ≠ 10²", "Nein, weil es ein gleichschenkliges Dreieck ist"],
        correctAnswer: 2,
        explanation: "Ein Dreieck ist rechtwinklig, wenn a² + b² = c² gilt. In diesem Fall: 13² + 13² = 169 + 169 = 338 ≠ 100 = 10². Also ist das Dreieck nicht rechtwinklig."
      },
      {
        question: "Welche Beziehung besteht zwischen dem Satz des Pythagoras und dem Kosinussatz?",
        options: ["Sie sind identisch", "Der Kosinussatz ist eine Verallgemeinerung des Satzes des Pythagoras", "Der Satz des Pythagoras ist eine Verallgemeinerung des Kosinussatzes", "Es gibt keine Beziehung zwischen beiden"],
        correctAnswer: 1,
        explanation: "Der Kosinussatz c² = a² + b² - 2ab·cos(γ) ist eine Verallgemeinerung des Satzes des Pythagoras. Für rechtwinklige Dreiecke ist γ = 90° und cos(90°) = 0, wodurch der Kosinussatz zum Satz des Pythagoras wird: c² = a² + b²."
      },
      {
        question: "Ein Haus hat ein Satteldach mit einer Höhe von 3 m. Der horizontale Abstand von der Dachspitze zum Rand beträgt 4 m. Wie lang ist die Dachschräge?",
        options: ["5 m", "7 m", "1 m", "9 m"],
        correctAnswer: 0,
        explanation: "Die Länge der Dachschräge berechnet sich mit dem Satz des Pythagoras: d = √(4² + 3²) = √(16 + 9) = √25 = 5 m."
      },
      {
        question: "Wenn man die Länge einer Kathete im rechtwinkligen Dreieck verdoppelt, wie verändert sich die Hypotenuse?",
        options: ["Sie verdoppelt sich auch", "Sie vergrößert sich um den Faktor √2", "Die Veränderung hängt von den konkreten Maßen ab", "Sie bleibt gleich"],
        correctAnswer: 2,
        explanation: "Die Veränderung hängt von den konkreten Maßen ab. Wenn eine Kathete a zu 2a wird, ändert sich die Hypotenuse von √(a² + b²) zu √((2a)² + b²) = √(4a² + b²), was keine einfache Proportion zur ursprünglichen Hypotenuse darstellt."
      }
    ]
  },
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
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;
  
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
  
  // Calculate pagination
  const totalExercises = topic.exercises.length;
  const totalPages = Math.ceil(totalExercises / exercisesPerPage);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = topic.exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  
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
                  {currentExercises.map((exercise, index) => (
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
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={currentPage === index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
                
                {/* Exercise counter */}
                <div className="text-center text-sm text-muted-foreground">
                  Übung {indexOfFirstExercise + 1} - {Math.min(indexOfLastExercise, totalExercises)} von {totalExercises}
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
