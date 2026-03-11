import { Link } from 'react-router-dom';
import {
  Leaf,
  Droplets,
  Calendar,
  ScanLine,
  Home,
  Sun,
  BarChart3,
  Plane,
  ShoppingCart,
  Bell,
  Check,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/landing" className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-gradient">Zimmerpflanze</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Preise
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Anmelden
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Kostenlos starten
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <a href="#features" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
              Features
            </a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
              Preise
            </a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
              FAQ
            </a>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
              Anmelden
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg bg-primary text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Kostenlos starten
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Leaf className="h-4 w-4" />
          Dein smarter Pflanzen-Manager
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Deine Pflanzen verdienen{' '}
          <span className="text-gradient">die beste Pflege</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Zimmerpflanze hilft dir, deine Zimmerpflanzen optimal zu pflegen.
          Giesserinnerungen, Pflegepläne, Urlaubsplanung und vieles mehr –
          alles in einer App.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Jetzt kostenlos starten
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-border px-8 py-3 text-base font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Mehr erfahren
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Kostenlos nutzbar – keine Kreditkarte erforderlich
        </p>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Droplets,
    title: 'Smarte Giesserinnerungen',
    description:
      'Vergiss nie wieder das Giessen. Individuelle Erinnerungen für jede Pflanze basierend auf ihren Beduerfnissen.',
  },
  {
    icon: Calendar,
    title: 'Pflegekalender',
    description:
      'Behalte den Ueberblick ueber alle anstehenden Aufgaben: Giessen, Duengen, Umtopfen – alles auf einen Blick.',
  },
  {
    icon: ScanLine,
    title: 'Pflanzen-Scanner',
    description:
      'Erkenne Pflanzen per Foto mit KI-Technologie und erhalte sofort alle Pflegehinweise.',
  },
  {
    icon: Home,
    title: 'Wohnungen & Räume',
    description:
      'Organisiere deine Pflanzen nach Wohnungen und Räumen mit Lichtverhaeltnissen und Standort.',
  },
  {
    icon: Plane,
    title: 'Urlaubsplanung',
    description:
      'Plane deinen Urlaub und lade Helfer ein, die sich um deine Pflanzen kuemmern.',
  },
  {
    icon: BarChart3,
    title: 'Statistiken & Einblicke',
    description:
      'Verfolge die Gesundheit und Pflege deiner Pflanzen mit detaillierten Statistiken und Grafiken.',
  },
  {
    icon: Sun,
    title: 'Pflanzenkatalog',
    description:
      'Ueber 55 Pflanzenarten mit detaillierten Pflegehinweisen, Lichtbeduerfnissen und Toxizitaetswarnungen.',
  },
  {
    icon: ShoppingCart,
    title: 'Einkaufsliste',
    description:
      'Erstelle Einkaufslisten fuer Erde, Duenger, Toepfe und Zubehoer – verknuepft mit deinen Pflanzen.',
  },
  {
    icon: Bell,
    title: 'Browser-Benachrichtigungen',
    description:
      'Erhalte Push-Benachrichtigungen direkt im Browser, wenn Pflege faellig ist.',
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Alles was deine Pflanzen brauchen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zimmerpflanze bietet dir alle Werkzeuge, um deine Zimmerpflanzen
            gesund und gluecklich zu halten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pricingPlans = [
  {
    name: 'Kostenlos',
    price: '0',
    description: 'Perfekt fuer den Einstieg',
    features: [
      'Bis zu 10 Pflanzen',
      'Giesserinnerungen',
      'Pflegekalender',
      'Pflanzenkatalog',
      '1 Wohnung',
    ],
    cta: 'Kostenlos starten',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '2,99',
    description: 'Fuer leidenschaftliche Pflanzeneltern',
    features: [
      'Unbegrenzte Pflanzen',
      'Alle kostenlosen Features',
      'KI Pflanzen-Scanner',
      'Unbegrenzte Wohnungen',
      'Urlaubsplanung mit Helfern',
      'Detaillierte Statistiken',
      'Einkaufslisten',
      'Vorrangiger Support',
    ],
    cta: 'Premium starten',
    highlighted: true,
  },
  {
    name: 'Familie',
    price: '4,99',
    description: 'Fuer die ganze Familie',
    features: [
      'Alles aus Premium',
      'Bis zu 5 Familienmitglieder',
      'Gemeinsame Pflanzen',
      'Aufgabenverteilung',
      'Familien-Kalender',
    ],
    cta: 'Familie starten',
    highlighted: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Einfache, transparente Preise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Starte kostenlos und upgrade, wenn du mehr brauchst. Monatlich kuendbar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-105'
                  : 'bg-card hover:shadow-lg transition-shadow'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Beliebteste Wahl
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price} EUR</span>
                <span className="text-muted-foreground text-sm"> / Monat</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25'
                    : 'border border-border hover:bg-muted'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    question: 'Ist Zimmerpflanze wirklich kostenlos?',
    answer:
      'Ja! Der kostenlose Plan bietet alle grundlegenden Funktionen fuer bis zu 10 Pflanzen. Du kannst jederzeit auf Premium upgraden, wenn du mehr Funktionen benoetigen.',
  },
  {
    question: 'Wie funktionieren die Giesserinnerungen?',
    answer:
      'Jede Pflanzenart hat individuelle Giessintervalle. Zimmerpflanze berechnet automatisch, wann deine Pflanzen gegossen werden muessen, und erinnert dich per Browser-Benachrichtigung.',
  },
  {
    question: 'Kann ich die App auf mehreren Geraeten nutzen?',
    answer:
      'Ja! Zimmerpflanze ist eine Web-App, die auf jedem Geraet mit einem modernen Browser funktioniert – Smartphone, Tablet oder Computer.',
  },
  {
    question: 'Wie funktioniert der Pflanzen-Scanner?',
    answer:
      'Der Pflanzen-Scanner nutzt KI-Technologie, um Pflanzen anhand eines Fotos zu erkennen. Du erhaeltst sofort den Pflanzennamen und passende Pflegehinweise aus unserem Katalog.',
  },
  {
    question: 'Was passiert mit meinen Daten?',
    answer:
      'Deine Daten gehoeren dir. Wir speichern sie sicher in der Cloud und geben sie niemals an Dritte weiter. Mehr dazu findest du in unserer Datenschutzerklaerung.',
  },
  {
    question: 'Kann ich mein Abo jederzeit kuendigen?',
    answer:
      'Ja, du kannst dein Premium-Abo jederzeit kuendigen. Deine Pflanzen und Daten bleiben erhalten, du wechselst einfach zurueck zum kostenlosen Plan.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-muted-foreground">
            Hier findest du Antworten auf die wichtigsten Fragen.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <button
                className="flex items-center justify-between w-full p-5 text-left hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span className="font-medium pr-4">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Bereit fuer gluecklichere Pflanzen?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Starte jetzt kostenlos und bringe deine Pflanzenpflege auf das naechste Level.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Jetzt kostenlos starten
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-gradient">Zimmerpflanze</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Dein smarter Begleiter fuer gesunde und glueckliche Zimmerpflanzen.
              Entwickelt mit Liebe von Fintutto.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Produkt</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">Preise</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
              </li>
              <li>
                <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Fintutto UG (haftungsbeschraenkt). Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
