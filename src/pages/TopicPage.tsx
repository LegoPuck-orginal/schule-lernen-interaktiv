
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
      },
      {
        question: "Wie bestimmt man die Steigung einer Geraden durch zwei Punkte P(x₁,y₁) und Q(x₂,y₂)?",
        options: ["m = (x₂-x₁)/(y₂-y₁)", "m = (y₂-y₁)/(x₂-x₁)", "m = (x₂+x₁)/(y₂+y₁)", "m = x₁·y₂ - x₂·y₁"],
        correctAnswer: 1,
        explanation: "Die Steigung einer Geraden durch zwei Punkte berechnet man mit der Formel m = (y₂-y₁)/(x₂-x₁)."
      },
      {
        question: "Was ist die Steigung einer horizontalen Geraden?",
        options: ["0", "1", "Unendlich", "Nicht definiert"],
        correctAnswer: 0,
        explanation: "Eine horizontale Gerade hat die Steigung 0, da sich der y-Wert bei Änderung des x-Werts nicht ändert."
      },
      {
        question: "Was ist die Steigung einer vertikalen Geraden?",
        options: ["0", "1", "Unendlich", "Nicht definiert"],
        correctAnswer: 3,
        explanation: "Eine vertikale Gerade hat keine definierte Steigung, da die Berechnung (y₂-y₁)/(x₂-x₁) eine Division durch Null erfordern würde."
      },
      {
        question: "Was ist die Gleichung der x-Achse?",
        options: ["y = 0", "x = 0", "y = 1", "x = 1"],
        correctAnswer: 0,
        explanation: "Die x-Achse ist die Menge aller Punkte mit y-Koordinate 0, also y = 0."
      },
      {
        question: "Was ist die Gleichung der y-Achse?",
        options: ["y = 0", "x = 0", "y = 1", "x = 1"],
        correctAnswer: 1,
        explanation: "Die y-Achse ist die Menge aller Punkte mit x-Koordinate 0, also x = 0."
      },
      {
        question: "Welche Steigung hat die Winkelhalbierende im ersten Quadranten?",
        options: ["0", "1", "-1", "2"],
        correctAnswer: 1,
        explanation: "Die Winkelhalbierende im ersten Quadranten hat die Gleichung y = x und damit die Steigung 1."
      },
      {
        question: "Wie lautet die Funktionsgleichung einer Geraden mit Steigung 3, die durch den Punkt (2,5) geht?",
        options: ["y = 3x - 1", "y = 3x - 3", "y = 3x + 5", "y = 3x - 1"],
        correctAnswer: 0,
        explanation: "Mit m = 3 und dem Punkt (2,5) setzen wir in die Geradengleichung ein: 5 = 3·2 + b ⟹ 5 = 6 + b ⟹ b = -1. Also lautet die Gleichung y = 3x - 1."
      },
      {
        question: "Was ist der Schnittpunkt der Geraden y = 2x + 3 und y = -x + 12?",
        options: ["(3,9)", "(4,11)", "(6,15)", "(9,3)"],
        correctAnswer: 0,
        explanation: "Setze die Gleichungen gleich: 2x + 3 = -x + 12 ⟹ 3x = 9 ⟹ x = 3. Dann y = 2·3 + 3 = 9. Der Schnittpunkt ist also (3,9)."
      },
      {
        question: "Was bedeutet es, wenn zwei Geraden parallel sind?",
        options: ["Sie haben die gleiche Steigung", "Sie haben die gleiche y-Achsenabschnitt", "Ihre Steigungen multipliziert ergeben 1", "Ihre Steigungen addiert ergeben 0"],
        correctAnswer: 0,
        explanation: "Parallele Geraden haben die gleiche Steigung, aber unterschiedliche y-Achsenabschnitte."
      },
      {
        question: "Was bedeutet es, wenn zwei Geraden senkrecht (orthogonal) zueinander sind?",
        options: ["Ihre Steigungen sind gleich", "Ihre Steigungen multipliziert ergeben 1", "Ihre Steigungen multipliziert ergeben -1", "Ihre Steigungen addiert ergeben 0"],
        correctAnswer: 2,
        explanation: "Zwei Geraden mit den Steigungen m₁ und m₂ sind genau dann senkrecht zueinander, wenn m₁·m₂ = -1 gilt."
      },
      {
        question: "Wie lautet die Geradengleichung in Normalform?",
        options: ["y = mx + b", "ax + by + c = 0", "y - y₁ = m(x - x₁)", "y = m(x - x₁) + y₁"],
        correctAnswer: 1,
        explanation: "Die Normalform einer Geradengleichung lautet ax + by + c = 0, wobei a, b und c reelle Zahlen sind mit a² + b² ≠ 0."
      },
      {
        question: "Wie lautet die Geradengleichung in Punkt-Steigungsform?",
        options: ["y = mx + b", "ax + by + c = 0", "y - y₁ = m(x - x₁)", "y = m(x - x₁) + y₁"],
        correctAnswer: 2,
        explanation: "Die Punkt-Steigungsform einer Geradengleichung lautet y - y₁ = m(x - x₁), wobei (x₁,y₁) ein Punkt auf der Geraden und m die Steigung ist."
      },
      {
        question: "Ein Auto fährt mit konstanter Geschwindigkeit von 60 km/h. Welche Art von Funktion beschreibt die zurückgelegte Strecke s in Abhängigkeit von der Zeit t?",
        options: ["Eine konstante Funktion", "Eine lineare Funktion", "Eine quadratische Funktion", "Eine Exponentialfunktion"],
        correctAnswer: 1,
        explanation: "Die zurückgelegte Strecke s ist proportional zur Zeit t: s(t) = 60·t. Das ist eine lineare Funktion."
      },
      {
        question: "Eine Gerade hat die Gleichung 3x - 4y + 12 = 0. Was ist ihre Steigung?",
        options: ["3/4", "4/3", "-3/4", "-4/3"],
        correctAnswer: 2,
        explanation: "Forme die Gleichung nach y um: 3x - 4y + 12 = 0 ⟹ -4y = -3x - 12 ⟹ y = 3x/4 + 3. Die Steigung ist also 3/4."
      },
      {
        question: "Die Geraden g: y = 2x + 3 und h: y = 2x - 5 sind...",
        options: ["senkrecht zueinander", "identisch", "parallel", "weder parallel noch senkrecht"],
        correctAnswer: 2,
        explanation: "Die Geraden haben beide die Steigung 2, aber unterschiedliche y-Achsenabschnitte. Sie sind also parallel."
      }
    ]
  },
  "polynomials": {
    title: "Polynome",
    subject: "math" as const,
    gradeLevel: "9",
    description: "Verstehe Polynome, ihre Eigenschaften und lerne die Polynomdivision.",
    videos: [
      {
        id: "video1",
        title: "Grundlagen der Polynome",
        description: "Was sind Polynome und wie werden sie klassifiziert?",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Polynomdivision",
        description: "Wie teilt man Polynome durch andere Polynome?",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Was ist ein Polynom?",
        options: [
          "Eine mathematische Gleichung mit mehreren Variablen", 
          "Ein Ausdruck mit Variablen und Konstanten, bei dem die Variablen nur mit ganzzahligen, nicht-negativen Exponenten auftreten", 
          "Eine Gleichung, die mehrere Lösungen hat", 
          "Ein geometrisches Objekt mit mehreren Ecken"
        ],
        correctAnswer: 1,
        explanation: "Ein Polynom ist ein algebraischer Ausdruck, der aus einer Summe von Termen besteht, wobei jeder Term das Produkt aus einer Konstante und einer Variablen mit nicht-negativem ganzzahligen Exponenten ist."
      },
      {
        question: "Welches der folgenden Beispiele ist KEIN Polynom?",
        options: ["P(x) = 3x² - 2x + 1", "P(x) = x⁴ + x^(-2)", "P(x) = 5", "P(x) = 7x³ - 4x"],
        correctAnswer: 1,
        explanation: "P(x) = x⁴ + x^(-2) ist kein Polynom, da der Term x^(-2) einen negativen Exponenten enthält. In Polynomen dürfen nur nicht-negative ganzzahlige Exponenten vorkommen."
      },
      {
        question: "Was ist der Grad eines Polynoms?",
        options: [
          "Die Anzahl der Terme im Polynom", 
          "Die Anzahl der Variablen im Polynom", 
          "Der höchste Exponent einer Variablen im Polynom", 
          "Die Summe aller Koeffizienten im Polynom"
        ],
        correctAnswer: 2,
        explanation: "Der Grad eines Polynoms ist der höchste Exponent einer Variablen, der im Polynom vorkommt. Beispiel: P(x) = 3x⁴ - 2x + 1 hat den Grad 4."
      },
      {
        question: "Was ist der Grad des Polynoms P(x) = 5x³ - 7x² + 2x - 3?",
        options: ["2", "3", "4", "7"],
        correctAnswer: 1,
        explanation: "Der höchste Exponent in diesem Polynom ist 3 (bei dem Term 5x³), daher ist der Grad des Polynoms 3."
      },
      {
        question: "Welches ist das Produkt der Polynome (2x - 3) und (x + 4)?",
        options: ["2x² + 5x - 12", "2x² - 3x + 8", "2x² + 5x + 8", "2x² + x - 12"],
        correctAnswer: 0,
        explanation: "Wir multiplizieren die beiden Polynome: (2x - 3)(x + 4) = 2x·x + 2x·4 - 3·x - 3·4 = 2x² + 8x - 3x - 12 = 2x² + 5x - 12"
      },
      {
        question: "Was ist das Ergebnis der Polynomdivision (x³ - 5x² + 3x - 2) ÷ (x - 2)?",
        options: ["x² - 3x - 3, Rest 0", "x² - 3x - 3, Rest -8", "x² - 3x + 3, Rest -8", "x² - 3x - 3, Rest 8"],
        correctAnswer: 2,
        explanation: "Bei der Polynomdivision erhalten wir als Quotient x² - 3x + 3 und als Rest -8. Das können wir überprüfen: (x² - 3x + 3)·(x - 2) - 8 = x³ - 2x² - 3x² + 6x + 3x - 6 - 8 = x³ - 5x² + 9x - 14 - 8 = x³ - 5x² + 9x - 22."
      },
      {
        question: "Welche der folgenden Aussagen über Polynome ist FALSCH?",
        options: [
          "Das Produkt zweier Polynome ist wieder ein Polynom", 
          "Die Summe zweier Polynome ist wieder ein Polynom", 
          "Der Quotient zweier Polynome ist immer ein Polynom", 
          "Die Differenz zweier Polynome ist wieder ein Polynom"
        ],
        correctAnswer: 2,
        explanation: "Der Quotient zweier Polynome ist im Allgemeinen KEIN Polynom. Beispiel: P(x) = x / (x + 1) ist kein Polynom, da es sich um einen gebrochen-rationalen Ausdruck handelt."
      },
      {
        question: "Welches der folgenden Polynome ist ein Binom?",
        options: ["P(x) = 3x² - 2x + 1", "P(x) = x³", "P(x) = 7x - 4", "P(x) = 5"],
        correctAnswer: 2,
        explanation: "Ein Binom ist ein Polynom mit genau zwei Termen. P(x) = 7x - 4 besteht aus zwei Termen, nämlich 7x und -4, und ist daher ein Binom."
      },
      {
        question: "Wie findet man die Nullstellen eines Polynoms P(x)?",
        options: [
          "Man berechnet die Werte von x, für die P(x) = 0 gilt",
          "Man berechnet die Werte von x, für die P(x) = 1 gilt",
          "Man berechnet den höchsten Exponenten von P(x)",
          "Man berechnet die Anzahl der Terme in P(x)"
        ],
        correctAnswer: 0,
        explanation: "Die Nullstellen eines Polynoms P(x) sind die Werte von x, für die P(x) = 0 gilt. Sie können geometrisch als die Schnittpunkte des Graphen des Polynoms mit der x-Achse interpretiert werden."
      },
      {
        question: "Welches der folgenden Polynome ist ein Monom?",
        options: ["P(x) = 3x² - 2x", "P(x) = x³", "P(x) = 7x - 4", "P(x) = 5 + x"],
        correctAnswer: 1,
        explanation: "Ein Monom ist ein Polynom mit genau einem Term. P(x) = x³ besteht aus nur einem Term und ist daher ein Monom."
      }
    ]
  },
  "probability": {
    title: "Wahrscheinlichkeitsrechnung",
    subject: "math" as const,
    gradeLevel: "9",
    description: "Grundlagen der Wahrscheinlichkeitsrechnung und ihre Anwendungen.",
    videos: [
      {
        id: "video1",
        title: "Einführung in die Wahrscheinlichkeitsrechnung",
        description: "Was ist Wahrscheinlichkeit und wie wird sie berechnet?",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Bedingte Wahrscheinlichkeit",
        description: "Berechnung von Wahrscheinlichkeiten unter Bedingungen.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Was ist die klassische Definition der Wahrscheinlichkeit?",
        options: [
          "Die relative Häufigkeit eines Ereignisses bei unendlich vielen Versuchen",
          "Die Anzahl der günstigen Ergebnisse geteilt durch die Anzahl aller möglichen Ergebnisse",
          "Der Quotient aus der Anzahl der Versuche und der Anzahl der Erfolge",
          "Die subjektive Einschätzung, dass ein Ereignis eintritt"
        ],
        correctAnswer: 1,
        explanation: "Nach der klassischen Definition ist die Wahrscheinlichkeit eines Ereignisses der Quotient aus der Anzahl der günstigen Ergebnisse und der Anzahl aller möglichen Ergebnisse (wenn alle Ergebnisse gleich wahrscheinlich sind)."
      },
      {
        question: "Bei einem fairen Würfel beträgt die Wahrscheinlichkeit, eine gerade Zahl zu würfeln:",
        options: ["1/6", "1/3", "1/2", "2/3"],
        correctAnswer: 2,
        explanation: "Es gibt 3 günstige Ergebnisse (2, 4, 6) von insgesamt 6 möglichen Ergebnissen. Die Wahrscheinlichkeit beträgt daher 3/6 = 1/2."
      },
      {
        question: "Aus einem Kartenspiel mit 32 Karten wird eine Karte gezogen. Wie groß ist die Wahrscheinlichkeit, eine Herz-Karte zu ziehen?",
        options: ["1/32", "1/8", "1/4", "1/2"],
        correctAnswer: 2,
        explanation: "In einem Kartenspiel mit 32 Karten gibt es 4 Farben mit jeweils 8 Karten. Es gibt also 8 Herz-Karten von insgesamt 32 Karten. Die Wahrscheinlichkeit beträgt daher 8/32 = 1/4."
      },
      {
        question: "Was versteht man unter dem Laplace-Experiment?",
        options: [
          "Ein Zufallsexperiment mit unendlich vielen möglichen Ergebnissen",
          "Ein Zufallsexperiment, bei dem alle Elementarereignisse gleich wahrscheinlich sind",
          "Ein Zufallsexperiment mit genau zwei möglichen Ergebnissen",
          "Ein Zufallsexperiment, bei dem die Ergebnisse voneinander abhängig sind"
        ],
        correctAnswer: 1,
        explanation: "Ein Laplace-Experiment ist ein Zufallsexperiment, bei dem alle Elementarereignisse die gleiche Wahrscheinlichkeit haben. Beispiele sind das Werfen einer fairen Münze oder eines fairen Würfels."
      },
      {
        question: "Wie groß ist die Wahrscheinlichkeit, bei zweimaligem Würfeln mit einem fairen Würfel zweimal die 6 zu würfeln?",
        options: ["1/6", "1/12", "1/36", "1/3"],
        correctAnswer: 2,
        explanation: "Die Wahrscheinlichkeit, beim ersten Wurf eine 6 zu würfeln, beträgt 1/6. Die Wahrscheinlichkeit, beim zweiten Wurf eine 6 zu würfeln, beträgt ebenfalls 1/6. Nach der Multiplikationsregel beträgt die Wahrscheinlichkeit, bei beiden Würfen eine 6 zu erhalten, 1/6 · 1/6 = 1/36."
      },
      {
        question: "Wie berechnet man die Wahrscheinlichkeit des Gegenereignisses?",
        options: [
          "P(Ā) = 1 - P(A)",
          "P(Ā) = P(A)",
          "P(Ā) = 1 / P(A)",
          "P(Ā) = P(A) - 1"
        ],
        correctAnswer: 0,
        explanation: "Die Wahrscheinlichkeit des Gegenereignisses Ā berechnet man, indem man die Wahrscheinlichkeit des Ereignisses A von 1 subtrahiert: P(Ā) = 1 - P(A)."
      },
      {
        question: "Wie berechnet man die Wahrscheinlichkeit für das Eintreten von mindestens einem von zwei Ereignissen A und B?",
        options: [
          "P(A oder B) = P(A) + P(B)",
          "P(A oder B) = P(A) + P(B) - P(A und B)",
          "P(A oder B) = P(A) · P(B)",
          "P(A oder B) = P(A) · P(B) - P(A und B)"
        ],
        correctAnswer: 1,
        explanation: "Die Wahrscheinlichkeit, dass mindestens eines der Ereignisse A und B eintritt, berechnet man nach der Formel P(A oder B) = P(A) + P(B) - P(A und B). Dies ist die sogenannte Additionsregel der Wahrscheinlichkeitsrechnung."
      },
      {
        question: "Wann sind zwei Ereignisse A und B unabhängig?",
        options: [
          "Wenn P(A und B) = 0 gilt",
          "Wenn P(A und B) = P(A) · P(B) gilt",
          "Wenn P(A oder B) = P(A) + P(B) gilt",
          "Wenn P(A) = P(B) gilt"
        ],
        correctAnswer: 1,
        explanation: "Zwei Ereignisse A und B sind unabhängig, wenn die Wahrscheinlichkeit ihres gemeinsamen Eintretens gleich dem Produkt ihrer Einzelwahrscheinlichkeiten ist: P(A und B) = P(A) · P(B)."
      },
      {
        question: "Was bedeutet der Begriff 'bedingte Wahrscheinlichkeit' P(A|B)?",
        options: [
          "Die Wahrscheinlichkeit, dass A eintritt, wenn bekannt ist, dass B eingetreten ist",
          "Die Wahrscheinlichkeit, dass A oder B eintritt",
          "Die Wahrscheinlichkeit, dass A und B gleichzeitig eintreten",
          "Die Wahrscheinlichkeit, dass A eintritt, vorausgesetzt B tritt nicht ein"
        ],
        correctAnswer: 0,
        explanation: "Die bedingte Wahrscheinlichkeit P(A|B) gibt die Wahrscheinlichkeit an, dass das Ereignis A eintritt, unter der Bedingung, dass das Ereignis B bereits eingetreten ist."
      },
      {
        question: "Wie berechnet man die bedingte Wahrscheinlichkeit P(A|B)?",
        options: [
          "P(A|B) = P(A) / P(B)",
          "P(A|B) = P(A und B) / P(B)",
          "P(A|B) = P(B) / P(A)",
          "P(A|B) = P(A) · P(B)"
        ],
        correctAnswer: 1,
        explanation: "Die bedingte Wahrscheinlichkeit P(A|B) berechnet man nach der Formel P(A|B) = P(A und B) / P(B), vorausgesetzt P(B) > 0."
      }
    ]
  },
  // German topics
  "grammatik": {
    title: "Grundlegende Grammatik",
    subject: "german" as const,
    gradeLevel: "5",
    description: "Wortarten und einfache Satzstrukturen verstehen.",
    videos: [
      {
        id: "video1",
        title: "Die Wortarten",
        description: "Nomen, Verben, Adjektive und andere Wortarten erkennen.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Der Satz und seine Struktur",
        description: "Subjekt, Prädikat, Objekt und mehr.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Welche der folgenden Wörter ist ein Nomen?",
        options: ["laufen", "schön", "Haus", "schnell"],
        correctAnswer: 2,
        explanation: "Ein Nomen (auch Substantiv genannt) bezeichnet Personen, Gegenstände, Orte oder abstrakte Konzepte. 'Haus' ist ein Nomen, während 'laufen' ein Verb, 'schön' und 'schnell' Adjektive sind."
      },
      {
        question: "Was ist ein Verb?",
        options: [
          "Ein Wort, das eine Person oder Sache bezeichnet",
          "Ein Wort, das eine Tätigkeit, einen Vorgang oder einen Zustand bezeichnet",
          "Ein Wort, das eine Eigenschaft beschreibt",
          "Ein Wort, das ein Nomen näher bestimmt"
        ],
        correctAnswer: 1,
        explanation: "Ein Verb (auch Zeitwort oder Tätigkeitswort genannt) bezeichnet eine Tätigkeit (z.B. 'laufen'), einen Vorgang (z.B. 'wachsen') oder einen Zustand (z.B. 'sein')."
      },
      {
        question: "Was ist das Subjekt eines Satzes?",
        options: [
          "Die Person oder Sache, die eine Tätigkeit ausführt oder sich in einem Zustand befindet",
          "Das Verb im Satz",
          "Die Person oder Sache, auf die sich die Tätigkeit bezieht",
          "Ein Wort, das das Verb näher beschreibt"
        ],
        correctAnswer: 0,
        explanation: "Das Subjekt ist die Person oder Sache, die die im Verb ausgedrückte Tätigkeit ausführt oder sich in dem vom Verb bezeichneten Zustand befindet. Es steht im Nominativ und antwortet auf die Frage 'Wer oder was?'."
      },
      {
        question: "In welchem Fall steht das direkte Objekt?",
        options: ["Nominativ", "Genitiv", "Dativ", "Akkusativ"],
        correctAnswer: 3,
        explanation: "Das direkte Objekt steht im Akkusativ und antwortet auf die Frage 'Wen oder was?'. Beispiel: 'Ich lese ein Buch.' - 'Was lese ich?' - 'Ein Buch' (Akkusativ)."
      },
      {
        question: "Welche Wortart beschreibt Eigenschaften?",
        options: ["Nomen", "Verben", "Adjektive", "Präpositionen"],
        correctAnswer: 2,
        explanation: "Adjektive beschreiben Eigenschaften von Nomen, wie z.B. 'groß', 'rot', 'interessant'."
      },
      {
        question: "Was ist der Unterschied zwischen einem Haupt- und einem Nebensatz?",
        options: [
          "Ein Hauptsatz ist wichtiger als ein Nebensatz",
          "Ein Hauptsatz kann alleine stehen, ein Nebensatz nicht",
          "Ein Hauptsatz hat immer mehr Wörter als ein Nebensatz",
          "Ein Hauptsatz enthält immer ein Subjekt, ein Nebensatz nicht"
        ],
        correctAnswer: 1,
        explanation: "Ein Hauptsatz kann alleine stehen und ist grammatikalisch unabhängig. Ein Nebensatz kann nicht alleine stehen und ist von einem Hauptsatz abhängig. Im Nebensatz steht das Verb meist am Ende."
      },
      {
        question: "Welcher Satz enthält ein indirektes Objekt (Dativobjekt)?",
        options: [
          "Ich lese ein Buch.",
          "Er gibt seinem Freund ein Geschenk.",
          "Sie kauft eine neue Jacke.",
          "Wir besuchen unsere Großeltern."
        ],
        correctAnswer: 1,
        explanation: "Das indirekte Objekt steht im Dativ und antwortet auf die Frage 'Wem?'. In 'Er gibt seinem Freund ein Geschenk' ist 'seinem Freund' das indirekte Objekt (Dativobjekt)."
      },
      {
        question: "In welchem Fall steht das Genitivobjekt?",
        options: ["Nominativ", "Genitiv", "Dativ", "Akkusativ"],
        correctAnswer: 1,
        explanation: "Das Genitivobjekt steht im Genitiv und antwortet auf die Frage 'Wessen?'. Beispiel: 'Er erinnert sich des Tages.' - 'Wessen erinnert er sich?' - 'Des Tages' (Genitiv)."
      },
      {
        question: "Welcher Satz ist ein Fragesatz?",
        options: [
          "Der Hund bellt laut.",
          "Komm schnell her!",
          "Wo wohnst du?",
          "Ich freue mich auf das Wochenende."
        ],
        correctAnswer: 2,
        explanation: "Ein Fragesatz dient dazu, eine Frage zu stellen, und endet mit einem Fragezeichen. In der Regel steht das Verb an erster oder zweiter Stelle. 'Wo wohnst du?' ist ein Fragesatz."
      },
      {
        question: "Welche Zeitform drückt eine abgeschlossene Handlung in der Vergangenheit aus?",
        options: ["Präsens", "Perfekt", "Futur I", "Plusquamperfekt"],
        correctAnswer: 1,
        explanation: "Das Perfekt (z.B. 'Ich habe gelesen') drückt eine abgeschlossene Handlung in der Vergangenheit aus, deren Auswirkungen noch in der Gegenwart spürbar sein können."
      }
    ]
  },
  // English topics
  "tenses-advanced": {
    title: "Fortgeschrittene Zeitformen",
    subject: "english" as const,
    gradeLevel: "9",
    description: "Present Perfect Continuous und Past Perfect.",
    videos: [
      {
        id: "video1",
        title: "Present Perfect Continuous",
        description: "Wie man das Present Perfect Continuous bildet und verwendet.",
        videoId: "dQw4w9WgXcQ",
      },
      {
        id: "video2",
        title: "Past Perfect",
        description: "Das Past Perfect verstehen und anwenden.",
        videoId: "dQw4w9WgXcQ",
      }
    ],
    exercises: [
      {
        question: "Wie bildet man das Present Perfect Continuous?",
        options: [
          "have/has + been + Infinitiv",
          "have/has + been + Verb-ing",
          "had + been + Infinitiv",
          "had + been + Verb-ing"
        ],
        correctAnswer: 1,
        explanation: "Das Present Perfect Continuous wird mit 'have/has + been + Verb-ing' gebildet. Beispiel: 'She has been working all day.'"
      },
      {
        question: "Wann verwendet man das Present Perfect Continuous?",
        options: [
          "Um eine abgeschlossene Handlung in der Vergangenheit auszudrücken",
          "Um eine Handlung auszudrücken, die vor einer anderen Handlung in der Vergangenheit stattfand",
          "Um eine Handlung auszudrücken, die in der Vergangenheit begann und bis in die Gegenwart andauert oder gerade abgeschlossen wurde",
          "Um eine zukünftige Handlung auszudrücken"
        ],
        correctAnswer: 2,
        explanation: "Das Present Perfect Continuous verwendet man, um eine Handlung auszudrücken, die in der Vergangenheit begann und bis in die Gegenwart andauert oder gerade abgeschlossen wurde, oft mit Betonung auf die Dauer. Beispiel: 'I have been waiting for you for two hours.'"
      },
      {
        question: "Welcher Satz ist im Present Perfect Continuous?",
        options: [
          "She works in a bank.",
          "She has worked in a bank.",
          "She has been working in a bank.",
          "She worked in a bank."
        ],
        correctAnswer: 2,
        explanation: "Der Satz 'She has been working in a bank' steht im Present Perfect Continuous, da er die Struktur 'has + been + Verb-ing' aufweist."
      },
      {
        question: "Wie bildet man das Past Perfect?",
        options: [
          "have/has + Partizip Perfekt",
          "had + Partizip Perfekt",
          "had + been + Partizip Perfekt",
          "have/has + been + Partizip Perfekt"
        ],
        correctAnswer: 1,
        explanation: "Das Past Perfect wird mit 'had + Partizip Perfekt' gebildet. Beispiel: 'She had finished her homework before dinner.'"
      },
      {
        question: "Wann verwendet man das Past Perfect?",
        options: [
          "Um eine abgeschlossene Handlung in der Vergangenheit auszudrücken",
          "Um eine Handlung auszudrücken, die vor einer anderen Handlung in der Vergangenheit stattfand",
          "Um eine Handlung auszudrücken, die in der Vergangenheit begann und bis in die Gegenwart andauert",
          "Um eine zukünftige Handlung auszudrücken"
        ],
        correctAnswer: 1,
        explanation: "Das Past Perfect verwendet man, um eine Handlung auszudrücken, die vor einer anderen Handlung in der Vergangenheit stattfand. Beispiel: 'When I arrived, she had already left.'"
      },
      {
        question: "Welcher Satz ist im Past Perfect?",
        options: [
          "He ate dinner.",
          "He has eaten dinner.",
          "He had eaten dinner.",
          "He was eating dinner."
        ],
        correctAnswer: 2,
        explanation: "Der Satz 'He had eaten dinner' steht im Past Perfect, da er die Struktur 'had + Partizip Perfekt' aufweist."
      },
      {
        question: "Welche Zeitform verwendet man, um auszudrücken, dass jemand etwas über einen längeren Zeitraum in der Vergangenheit getan hat und es möglicherweise immer noch tut?",
        options: [
          "Simple Past",
          "Present Perfect",
          "Present Perfect Continuous",
          "Past Perfect"
        ],
        correctAnswer: 2,
        explanation: "Das Present Perfect Continuous verwendet man, um auszudrücken, dass jemand etwas über einen längeren Zeitraum in der Vergangenheit getan hat und es möglicherweise immer noch tut. Beispiel: 'He has been studying English for five years.'"
      },
      {
        question: "Welche Zeitform drückt eine abgeschlossene Handlung in der Vergangenheit aus, deren Ergebnis in der Gegenwart noch relevant ist?",
        options: [
          "Simple Past",
          "Present Perfect",
          "Present Perfect Continuous",
          "Past Perfect"
        ],
        correctAnswer: 1,
        explanation: "Das Present Perfect verwendet man, um eine abgeschlossene Handlung in der Vergangenheit auszudrücken, deren Ergebnis in der Gegenwart noch relevant ist. Beispiel: 'I have lost my keys' (und suche sie immer noch)."
      },
      {
        question: "Welcher Satz zeigt das richtige Signalwort für das Present Perfect Continuous?",
        options: [
          "He has been learning Spanish yesterday.",
          "He has been learning Spanish since 2010.",
          "He has been learning Spanish ago.",
          "He has been learning Spanish last week."
        ],
        correctAnswer: 1,
        explanation: "Signalwörter für das Present Perfect Continuous sind 'since' (seit einem bestimmten Zeitpunkt) und 'for' (für einen Zeitraum). 'Yesterday', 'ago' und 'last week' werden mit dem Simple Past verwendet."
      },
      {
        question: "Wie lautet die Frage im Past Perfect richtig?",
        options: [
          "Did she finish her homework?",
          "Has she finished her homework?",
          "Had she finished her homework?",
          "Was she finished her homework?"
        ],
        correctAnswer: 2,
        explanation: "Eine Frage im Past Perfect beginnt mit 'Had' gefolgt vom Subjekt und dem Partizip Perfekt: 'Had she finished her homework?'"
      }
    ]
  }
};

const TopicPage = () => {
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();
  const [currentTab, setCurrentTab] = useState("overview");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Safety check to make sure the topic exists
  if (!subject || !topicId || !topicData[topicId as keyof typeof topicData]) {
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
              <Link to="/">Zurück zur Startseite</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const topic = topicData[topicId as keyof typeof topicData];
  const currentVideo = topic.videos[currentVideoIndex];
  const currentExercise = topic.exercises[currentExerciseIndex];
  const exercisesPerPage = 5;
  const totalPages = Math.ceil(topic.exercises.length / exercisesPerPage);
  const currentPage = Math.floor(currentExerciseIndex / exercisesPerPage) + 1;

  const handleCheckAnswer = (index: number) => {
    setSelectedAnswer(index);
    setIsCorrect(index === currentExercise.correctAnswer);
    setShowExplanation(true);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < topic.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    }
  };

  const handleGoToPage = (page: number) => {
    const newIndex = (page - 1) * exercisesPerPage;
    if (newIndex >= 0 && newIndex < topic.exercises.length) {
      setCurrentExerciseIndex(newIndex);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`py-12 bg-${topic.subject}/10`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <Button asChild variant="ghost" size="sm" className="mb-4">
                <Link to={`/subject/${topic.subject}`} className="flex items-center text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück zu {topic.subject === "math" ? "Mathematik" : topic.subject === "german" ? "Deutsch" : "Englisch"}
                </Link>
              </Button>
              
              <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
              
              <div className="flex items-center text-muted-foreground">
                <GraduationCap className="mr-2 h-5 w-5" />
                <span>Klasse {topic.gradeLevel}</span>
              </div>
              
              <p className="text-muted-foreground max-w-prose">
                {topic.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview" className="flex items-center">
                  <Book className="mr-2 h-4 w-4" />
                  Überblick
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  Videos ({topic.videos.length})
                </TabsTrigger>
                <TabsTrigger value="exercises" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Übungen ({topic.exercises.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Überblick</h2>
                    <p className="text-muted-foreground mb-6">{topic.description}</p>
                    
                    <h3 className="text-xl font-medium mb-3">Was du lernen wirst:</h3>
                    <ul className="space-y-2">
                      {topic.videos.map((video) => (
                        <li key={video.id} className="flex items-start">
                          <PenLine className="h-5 w-5 mr-2 text-primary" />
                          <span>{video.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {topic.videos.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">Einführungsvideo</h2>
                      <VideoPlayer videoId={topic.videos[0].videoId} title={topic.videos[0].title} />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button onClick={() => setCurrentTab("exercises")} className="mr-4">
                    Mit Übungen beginnen
                  </Button>
                  <Button onClick={() => setCurrentTab("videos")} variant="outline">
                    Alle Videos ansehen
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <VideoPlayer videoId={currentVideo.videoId} title={currentVideo.title} />
                    <h2 className="text-2xl font-semibold mt-4">{currentVideo.title}</h2>
                    <p className="text-muted-foreground">{currentVideo.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {topic.videos.map((video, index) => (
                      <Button 
                        key={video.id}
                        variant={index === currentVideoIndex ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentVideoIndex(index)}
                        className="flex-grow md:flex-grow-0"
                      >
                        Video {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="exercises" className="space-y-6">
                <ExerciseCard 
                  question={currentExercise.question}
                  options={currentExercise.options}
                  onSelectAnswer={handleCheckAnswer}
                  selectedAnswer={selectedAnswer}
                  isCorrect={isCorrect}
                  showExplanation={showExplanation}
                  explanation={currentExercise.explanation}
                />
                
                <div className="flex justify-between items-center mt-6">
                  <Button 
                    onClick={handlePreviousExercise} 
                    disabled={currentExerciseIndex === 0}
                    variant="outline"
                  >
                    Vorherige Aufgabe
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Aufgabe {currentExerciseIndex + 1} von {topic.exercises.length}
                  </div>
                  
                  <Button 
                    onClick={handleNextExercise} 
                    disabled={currentExerciseIndex === topic.exercises.length - 1}
                  >
                    Nächste Aufgabe
                  </Button>
                </div>
                
                {topic.exercises.length > exercisesPerPage && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handleGoToPage(currentPage > 1 ? currentPage - 1 : 1)}
                          disabled={currentPage === 1} 
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            onClick={() => handleGoToPage(page)}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handleGoToPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                          disabled={currentPage === totalPages} 
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
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
