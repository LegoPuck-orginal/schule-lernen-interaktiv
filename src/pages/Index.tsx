
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Calculator, Globe, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubjectCard from '@/components/SubjectCard';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-blue-200 opacity-20 blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute right-0 top-1/3 h-48 w-48 rounded-full bg-purple-200 opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute left-1/4 bottom-1/3 h-40 w-40 rounded-full bg-indigo-200 opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="font-heading gradient-text">
                Interaktives Lernen für Hamburger Schüler
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Entdecke Lernmaterialien, Übungen und Erklärvideos für Mathematik, Deutsch und Englisch - von der 5. bis zur 13. Klasse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link to="/grades">
                    Jetzt starten <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Mehr erfahren</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Subjects Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="mb-4">Unsere Fächer</h2>
              <p className="text-muted-foreground">
                Wähle ein Fach und starte mit dem interaktiven Lernen - speziell angepasst an den Hamburger Lehrplan.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SubjectCard 
                title="Mathematik" 
                description="Von Grundrechenarten bis zur Analysis - alle Themen verständlich erklärt."
                icon={Calculator}
                colorClass="bg-math"
                bgClass="hover:bg-math/5"
                href="/subject/math"
              />
              <SubjectCard 
                title="Deutsch" 
                description="Grammatik, Rechtschreibung, Literatur und mehr für alle Klassenstufen."
                icon={Book}
                colorClass="bg-german"
                bgClass="hover:bg-german/5"
                href="/subject/german"
              />
              <SubjectCard 
                title="Englisch" 
                description="Vokabeln, Grammatik und Konversation für sicheres Englisch im Unterricht."
                icon={Globe}
                colorClass="bg-english"
                bgClass="hover:bg-english/5"
                href="/subject/english"
              />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="mb-4">So funktioniert's</h2>
              <p className="text-muted-foreground">
                Unser Konzept verbindet verschiedene Lernmethoden für optimale Lernerfolge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Themen verstehen</h3>
                  <p className="text-muted-foreground">
                    Lerne mit SimpleClub-Videos, die komplexe Themen einfach und verständlich erklären.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Interaktive Übungen</h3>
                  <p className="text-muted-foreground">
                    Teste dein Wissen mit interaktiven Übungen und erhalte sofort Feedback.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Fortschritt verfolgen</h3>
                  <p className="text-muted-foreground">
                    Behalte deinen Lernfortschritt im Blick und erkenne, wo du noch Nachholbedarf hast.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Grade Levels */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="mb-4">Für alle Klassenstufen</h2>
              <p className="text-muted-foreground">
                Von der 5. bis zur 13. Klasse - wir bieten Lernmaterialien für jeden Jahrgang.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[5, 6, 7, 8, 9, 10, 11, 12, 13].map((grade) => (
                <Link to={`/grade/${grade}`} key={grade}>
                  <Card className="text-center card-hover">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold mb-2">{grade}</h3>
                      <p className="text-sm text-muted-foreground">Klasse</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="font-heading">Bereit zum Lernen?</h2>
              <p className="text-primary-foreground/80">
                Starte jetzt mit interaktiven Übungen und verständlichen Erklärungen für bessere Noten.
              </p>
              <Button size="lg" variant="outline" className="bg-white hover:bg-white/90 text-primary mt-4" asChild>
                <Link to="/grades">Jetzt starten</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
