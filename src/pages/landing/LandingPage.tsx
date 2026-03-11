import { Link } from 'react-router-dom';
import {
  Leaf,
  Droplets,
  Calendar,
  Sun,
  BarChart3,
  Smartphone,
  ScanLine,
  ShoppingCart,
  Plane,
  ChevronRight,
  Sprout,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Droplets,
    title: 'Gieß-Erinnerungen',
    description: 'Nie wieder vergessen — individuelle Gießpläne für jede Pflanze.',
  },
  {
    icon: Calendar,
    title: 'Pflegekalender',
    description: 'Alle Aufgaben auf einen Blick: Gießen, Düngen, Umtopfen.',
  },
  {
    icon: ScanLine,
    title: 'Pflanzen-Scanner',
    description: 'Pflanze fotografieren und sofort erkennen lassen.',
  },
  {
    icon: Sun,
    title: 'Standort-Beratung',
    description: 'Lichtbedarf und optimale Raumzuordnung für jede Pflanze.',
  },
  {
    icon: BarChart3,
    title: 'Statistiken',
    description: 'Verfolge die Gesundheit deiner Pflanzen mit Auswertungen.',
  },
  {
    icon: Plane,
    title: 'Urlaubsmodus',
    description: 'Delegiere Pflanzenpflege an Helfer während du verreist.',
  },
  {
    icon: ShoppingCart,
    title: 'Einkaufsliste',
    description: 'Erde, Dünger, Töpfe — alles organisiert an einem Ort.',
  },
  {
    icon: Smartphone,
    title: 'Mehrere Wohnungen',
    description: 'Verwalte Pflanzen in verschiedenen Wohnungen und Räumen.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/landing" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">Zimmerpflanze</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Funktionen</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">So funktioniert's</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">Preise</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Anmelden</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gap-1">
                  Kostenlos starten <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sprout className="w-4 h-4" />
            Dein digitaler Pflanzen-Assistent
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Deine Pflanzen verdienen{' '}
            <span className="text-gradient">die beste Pflege</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            Zimmerpflanze hilft dir, deine Pflanzen gesund und glücklich zu halten.
            Gießpläne, Pflegetipps, Scanner und vieles mehr — alles in einer App.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/register">
              <Button size="lg" className="text-base px-8 gap-2">
                <Leaf className="w-5 h-5" />
                Jetzt kostenlos starten
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="text-base px-8">
                Funktionen entdecken
              </Button>
            </a>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative max-w-4xl mx-auto animate-slide-up">
            <div className="rounded-2xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden p-8">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Monstera', health: 95, water: 'Morgen', emoji: '🪴' },
                  { name: 'Ficus Lyrata', health: 88, water: 'Heute', emoji: '🌿' },
                  { name: 'Aloe Vera', health: 100, water: 'In 3 Tagen', emoji: '🌱' },
                ].map((plant) => (
                  <div
                    key={plant.name}
                    className="rounded-xl border bg-background p-4 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">{plant.emoji}</div>
                    <p className="font-semibold text-sm">{plant.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Heart className="w-3 h-3 text-primary" />
                      <span className="text-xs text-muted-foreground">{plant.health}%</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-muted-foreground">{plant.water}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative gradient */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Alles, was deine Pflanzen brauchen
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Von der Erkennung bis zur Pflege — Zimmerpflanze begleitet dich bei jedem Schritt.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              In 3 Schritten loslegen
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Einfach registrieren, Pflanzen hinzufügen und entspannt zurücklehnen.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Konto erstellen',
                description: 'Registriere dich kostenlos in wenigen Sekunden.',
                icon: Smartphone,
              },
              {
                step: '2',
                title: 'Pflanzen hinzufügen',
                description: 'Scanne oder suche deine Pflanzen im Katalog mit über 150 Arten.',
                icon: ScanLine,
              },
              {
                step: '3',
                title: 'Pflege genießen',
                description: 'Erhalte Erinnerungen und beobachte, wie deine Pflanzen gedeihen.',
                icon: Heart,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Kostenlos starten</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Zimmerpflanze ist kostenlos nutzbar. Für Power-User gibt es ein optionales Premium-Abo
            mit erweiterten Funktionen.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="rounded-xl border bg-card p-6 text-left">
              <p className="text-sm font-medium text-muted-foreground mb-1">Free</p>
              <p className="text-3xl font-bold mb-4">0 &euro;</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Bis zu 10 Pflanzen</li>
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Gieß-Erinnerungen</li>
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Pflanzenkatalog</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-primary bg-card p-6 text-left relative">
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                Beliebt
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Premium</p>
              <p className="text-3xl font-bold mb-4">4,99 &euro;<span className="text-sm font-normal text-muted-foreground">/Monat</span></p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Unbegrenzte Pflanzen</li>
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Pflanzen-Scanner</li>
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Statistiken &amp; Auswertungen</li>
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Urlaubsmodus</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border p-10 sm:p-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Bereit für grünere Zeiten?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Schließe dich Tausenden von Pflanzenliebhabern an und starte noch heute.
            </p>
            <Link to="/register">
              <Button size="lg" className="text-base px-8 gap-2">
                <Sprout className="w-5 h-5" />
                Kostenlos registrieren
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-gradient">Zimmerpflanze</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Dein digitaler Assistent für gesunde und glückliche Pflanzen.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Produkt</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Funktionen</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Preise</a></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Anmelden</Link></li>
                <li><Link to="/register" className="hover:text-foreground transition-colors">Registrieren</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Rechtliches</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link></li>
                <li><Link to="/agb" className="hover:text-foreground transition-colors">AGB</Link></li>
                <li><Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Fintutto UG. Alle Rechte vorbehalten.</p>
            <p>Made with <Heart className="w-3 h-3 inline text-primary" /> für Pflanzenliebhaber</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
