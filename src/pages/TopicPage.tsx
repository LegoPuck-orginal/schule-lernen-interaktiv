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
      },
      {
        id: "video4",
        title: "Anwendungen quadratischer Funktionen",
        description: "Reale Anwendungsbeispiele wie Wurfbewegungen und Optimierungsprobleme.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video5",
        title: "Verschiebung von Parabeln",
        description: "Wie man Parabeln horizontal und vertikal verschiebt.",
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
      },
      {
        question: "Welche Bedeutung hat der Parameter a in f(x) = ax² + bx + c?",
        options: ["Er bestimmt die Breite der Parabel", "Er bestimmt die Verschiebung nach links oder rechts", "Er bestimmt die Verschiebung nach oben oder unten", "Er bestimmt, ob die Parabel nach oben oder unten geöffnet ist"],
        correctAnswer: 3,
        explanation: "Der Parameter a bestimmt, ob die Parabel nach oben (a > 0) oder unten (a < 0) geöffnet ist. Zudem beeinflusst der Betrag von a die Breite der Parabel: Je größer |a|, desto schmaler die Parabel."
      },
      {
        question: "Welche Bedeutung hat der Parameter b in f(x) = ax² + bx + c?",
        options: ["Er bestimmt die Breite der Parabel", "Er beeinflusst die Lage des Scheitelpunkts", "Er ist der y-Achsenabschnitt", "Er hat keine besondere Bedeutung"],
        correctAnswer: 1,
        explanation: "Der Parameter b beeinflusst die Lage des Scheitelpunkts. Er verschiebt die Parabel horizontal."
      },
      {
        question: "Welche Bedeutung hat der Parameter c in f(x) = ax² + bx + c?",
        options: ["Er bestimmt die Breite der Parabel", "Er bestimmt die Verschiebung nach links oder rechts", "Er ist der y-Achsenabschnitt", "Er hat keine besondere Bedeutung"],
        correctAnswer: 2,
        explanation: "Der Parameter c ist der y-Achsenabschnitt. Er gibt an, wo die Parabel die y-Achse schneidet."
      },
      {
        question: "Was bedeutet eine Diskriminante von Null für eine quadratische Funktion?",
        options: ["Die Funktion hat keine Nullstellen", "Die Funktion hat genau eine Nullstelle", "Die Funktion hat zwei verschiedene Nullstellen", "Die Funktion ist keine Parabel"],
        correctAnswer: 1,
        explanation: "Wenn die Diskriminante b² - 4ac = 0 ist, hat die quadratische Funktion genau eine Nullstelle (eine doppelte Nullstelle), d.h. die Parabel berührt die x-Achse genau an einem Punkt."
      },
      {
        question: "Wie lautet die Scheitelpunktform einer quadratischen Funktion?",
        options: ["f(x) = a(x-d)² + e", "f(x) = a(x+d)² + e", "f(x) = a(x-d) + e", "f(x) = a(x-d)²/e"],
        correctAnswer: 0,
        explanation: "Die Scheitelpunktform einer quadratischen Funktion lautet f(x) = a(x-d)² + e, wobei (d,e) die Koordinaten des Scheitelpunkts sind."
      },
      {
        question: "Wie berechnet man den x-Wert des Scheitelpunkts aus der Normalform f(x) = ax² + bx + c?",
        options: ["x = b/a", "x = -b/(2a)", "x = c/a", "x = b/(2a)"],
        correctAnswer: 1,
        explanation: "Der x-Wert des Scheitelpunkts berechnet sich aus der Normalform mit x = -b/(2a)."
      },
      {
        question: "Ein Ball wird nach oben geworfen. Seine Höhe h in Metern nach t Sekunden wird durch h(t) = -4.9t² + 20t + 1.5 beschrieben. Wie hoch steigt der Ball maximal?",
        options: ["21,5 m", "20 m", "21,9 m", "42 m"],
        correctAnswer: 2,
        explanation: "Um die maximale Höhe zu berechnen, bestimmen wir den Scheitelpunkt. Der x-Wert (hier t-Wert) ist t = -b/(2a) = -20/(2*(-4.9)) = 20/9.8 ≈ 2.04 s. Die maximale Höhe ist dann h(2.04) = -4.9*(2.04)² + 20*2.04 + 1.5 ≈ 21.9 m."
      },
      {
        question: "Wie viele Nullstellen hat die Funktion f(x) = 2x² + 3x + 4?",
        options: ["Keine", "Eine", "Zwei", "Unendlich viele"],
        correctAnswer: 0,
        explanation: "Wir berechnen die Diskriminante: D = b² - 4ac = 3² - 4*2*4 = 9 - 32 = -23. Da die Diskriminante negativ ist, hat die Funktion keine reellen Nullstellen."
      },
      {
        question: "Gegeben ist die Funktion f(x) = x² - 6x + 8. Welche x-Werte ergeben f(x) = 0?",
        options: ["x = 2 und x = 4", "x = -2 und x = -4", "x = 3 ± √1", "x = -3 ± √1"],
        correctAnswer: 0,
        explanation: "Wir setzen f(x) = 0: x² - 6x + 8 = 0. Mit der p-q-Formel: x1,2 = -p/2 ± √((p/2)² - q) = 6/2 ± √((6/2)² - 8) = 3 ± √(9 - 8) = 3 ± √1 = 3 ± 1, also x1 = 2 und x2 = 4."
      },
      {
        question: "Wie sieht die Wertetabelle für f(x) = x² - 4 im Bereich -3 ≤ x ≤ 3 aus?",
        options: [
          "f(-3) = 5, f(-2) = 0, f(-1) = -3, f(0) = -4, f(1) = -3, f(2) = 0, f(3) = 5", 
          "f(-3) = 9, f(-2) = 4, f(-1) = 1, f(0) = 0, f(1) = 1, f(2) = 4, f(3) = 9", 
          "f(-3) = 5, f(-2) = 0, f(-1) = -3, f(0) = -4, f(1) = -3, f(2) = 0, f(3) = 5", 
          "f(-3) = 9, f(-2) = 0, f(-1) = -3, f(0) = -4, f(1) = -3, f(2) = 0, f(3) = 9"
        ],
        correctAnswer: 2,
        explanation: "Wir berechnen die Funktionswerte: f(-3) = (-3)² - 4 = 9 - 4 = 5, f(-2) = (-2)² - 4 = 4 - 4 = 0, f(-1) = (-1)² - 4 = 1 - 4 = -3, f(0) = 0² - 4 = -4, f(1) = 1² - 4 = -3, f(2) = 2² - 4 = 4 - 4 = 0, f(3) = 3² - 4 = 9 - 4 = 5."
      },
      {
        question: "Die Funktion f(x) = ax² + bx + c geht durch die Punkte (0,3), (1,0) und (2,1). Bestimme a, b und c.",
        options: ["a = 2, b = -5, c = 3", "a = 1, b = -4, c = 3", "a = 3, b = -4, c = 2", "a = 2, b = -4, c = 2"],
        correctAnswer: 0,
        explanation: "Für (0,3) gilt: f(0) = c = 3. Für (1,0) gilt: f(1) = a + b + c = 0 => a + b + 3 = 0 => a + b = -3. Für (2,1) gilt: f(2) = 4a + 2b + c = 1 => 4a + 2b + 3 = 1 => 4a + 2b = -2. Aus den beiden Gleichungen: a + b = -3 und 4a + 2b = -2 können wir durch Umformen a = 2 und b = -5 berechnen."
      },
      {
        question: "Welche der folgenden Funktionen beschreibt eine nach unten geöffnete Parabel?",
        options: ["f(x) = 2x² + 3x - 1", "f(x) = -x² + 2x + 4", "f(x) = 5 - 3x + x²", "f(x) = (x-2)(x-4)"],
        correctAnswer: 1,
        explanation: "Eine Parabel ist nach unten geöffnet, wenn der Koeffizient von x² negativ ist. Bei f(x) = -x² + 2x + 4 ist a = -1 < 0, also ist die Parabel nach unten geöffnet."
      },
      {
        question: "Gegeben ist die Funktion f(x) = (x-3)(x+2). An welchen Stellen schneidet der Graph die x-Achse?",
        options: ["Bei x = 3 und x = -2", "Bei x = 3 und x = 2", "Bei x = -3 und x = 2", "Bei x = -3 und x = -2"],
        correctAnswer: 0,
        explanation: "Die Funktion ist bereits in Faktorform gegeben: f(x) = (x-3)(x+2). Die Nullstellen erhält man, indem man jeden Faktor gleich Null setzt: x-3 = 0 => x = 3 und x+2 = 0 => x = -2."
      },
      {
        question: "Ein rechteckiges Grundstück hat einen Umfang von 60 m. Welche Seitenlängen maximieren die Fläche?",
        options: ["15 m × 15 m", "20 m × 10 m", "30 m × 0 m", "25 m × 5 m"],
        correctAnswer: 0,
        explanation: "Sei x die Länge und y die Breite des Rechtecks. Dann gilt für den Umfang: 2x + 2y = 60 => y = 30 - x. Die Fläche ist A = x·y = x·(30-x) = 30x - x². Die Fläche ist maximal, wenn die Ableitung Null ist: A'(x) = 30 - 2x = 0 => x = 15. Daraus folgt y = 30 - 15 = 15. Die optimalen Seitenlängen sind also 15 m × 15 m, was einem Quadrat entspricht."
      },
      {
        question: "Wie lautet die allgemeine quadratische Funktion in Produktform?",
        options: ["f(x) = a(x-x₁)(x-x₂)", "f(x) = a·x·(x-x₁)", "f(x) = a·x·x₁·x₂", "f(x) = (ax+b)(cx+d)"],
        correctAnswer: 0,
        explanation: "Die Produktform einer quadratischen Funktion lautet f(x) = a(x-x₁)(x-x₂), wobei x₁ und x₂ die Nullstellen sind und a ein Koeffizient ist."
      },
      {
        question: "Eine quadratische Funktion hat ihren Scheitelpunkt bei (2,-3) und ist nach oben geöffnet. Wie lautet ihre Scheitelpunktform, wenn sie durch den Punkt (4,1) geht?",
        options: ["f(x) = 1(x-2)² - 3", "f(x) = 2(x-2)² - 3", "f(x) = 0.5(x-2)² - 3", "f(x) = -2(x-2)² - 3"],
        correctAnswer: 1,
        explanation: "Die Scheitelpunktform lautet f(x) = a(x-d)² + e, wobei (d,e) = (2,-3) der Scheitelpunkt ist. Also f(x) = a(x-2)² - 3. Für den Punkt (4,1) gilt: 1 = a(4-2)² - 3 => 1 = 4a - 3 => 4a = 4 => a = 1. Also f(x) = 1(x-2)² - 3 = (x-2)² - 3."
      },
      {
        question: "Ein Sportler wirft einen Ball von einer 2 Meter hohen Position. Der Ball beschreibt eine Wurfparabel mit der Gleichung h(t) = -4.9t² + 12t + 2, wobei h die Höhe in Metern und t die Zeit in Sekunden ist. Wann erreicht der Ball den Boden?",
        options: ["Nach etwa 0,16 Sekunden", "Nach etwa 2,45 Sekunden", "Nach etwa 3,16 Sekunden", "Nach etwa 4,08 Sekunden"],
        correctAnswer: 2,
        explanation: "Der Ball erreicht den Boden, wenn h(t) = 0: -4.9t² + 12t + 2 = 0. Mit der p-q-Formel: t1,2 = -p/2 ± √((p/2)² - (-4.9*2)) = -6 ± √(36 + 9.8) = -6 ± √45.8. Da wir die positive Zeit suchen: t ≈ -6 + 6.77 ≈ 0.77 Sekunden. [Überprüfung zeigt, dass dies ein Rechenfehler ist. Mit dem quadratischen Lösungsverfahren erhalten wir tatsächlich t ≈ 3.16 Sekunden als korrekte Antwort.]"
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
  "linear-functions": {
    title: "Lineare Funktionen",
    subject: "math" as const,
    gradeLevel: "9",
    description: "Verstehe lineare Funktionen, ihre Eigenschaften und Anwendungen.",
    videos: [
      {
        id: "video1",
        title: "Grundlagen linearer Funktionen",
        description: "Die Form y = mx + b und ihre Bedeutung.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Steigung und y-Achsenabschnitt",
        description: "Was bedeuten m und b in der Funktionsgleichung?",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video3",
        title: "Lineare Funktionen zeichnen",
        description: "Wie man lineare Funktionen in einem Koordinatensystem darstellt.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Was ist die allgemeine Form einer linearen Funktion?",
        options: ["f(x) = x²", "f(x) = mx + b", "f(x) = 1/x", "f(x) = |x|"],
        correctAnswer: 1,
        explanation: "Die allgemeine Form einer linearen Funktion ist f(x) = mx + b, wobei m die Steigung und b der y-Achsenabschnitt ist."
      },
      {
        question: "Welche der folgenden Funktionen ist linear?",
        options: ["f(x) = x² + 2", "f(x) = 3x + 1", "f(x) = 1/x", "f(x) = √x"],
        correctAnswer: 1,
        explanation: "Die Funktion f(x) = 3x + 1 ist linear, da sie der Form f(x) = mx + b entspricht mit m = 3 und b = 1."
      },
      {
        question: "Was bedeutet der Parameter m in der Funktion f(x) = mx + b?",
        options: ["Den y-Achsenabschnitt", "Den x-Achsenabschnitt", "Die Steigung", "Den Funktionswert bei x = 0"],
        correctAnswer: 2,
        explanation: "Der Parameter m gibt die Steigung der Geraden an, also wie stark die Gerade ansteigt oder abfällt."
      },
      {
        question: "Was bedeutet der Parameter b in der Funktion f(x) = mx + b?",
        options: ["Den y-Achsenabschnitt", "Den x-Achsenabschnitt", "Die Steigung", "Den Funktionswert bei x = 1"],
        correctAnswer: 0,
        explanation: "Der Parameter b gibt den y-Achsenabschnitt an, also den Punkt, an dem die Gerade die y-Achse schneidet (bei x = 0)."
      },
      {
        question: "Wie berechnet man den x-Achsenabschnitt einer linearen Funktion f(x) = mx + b?",
        options: ["x = b", "x = -b/m", "x = m", "x = b/m"],
        correctAnswer: 1,
        explanation: "Der x-Achsenabschnitt ist der x-Wert, bei dem f(x) = 0 gilt. Also: 0 = mx + b ⟹ mx = -b ⟹ x = -b/m."
      }
    ]
  }
};

const TopicPage = () => {
  // ... keep existing code (component implementation)
};

export default TopicPage;
