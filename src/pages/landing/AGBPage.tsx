import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AGBPage() {
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
            <Link to="/landing">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" /> Zurück
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Stand: März 2026</p>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 1 Geltungsbereich</h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der
                Webapplikation „Zimmerpflanze" (nachfolgend „Dienst"), bereitgestellt von der
                Fintutto UG (haftungsbeschränkt), [Adresse] (nachfolgend „Anbieter").
              </p>
              <p>
                (2) Mit der Registrierung und Nutzung des Dienstes erkennt der Nutzer diese AGB an.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 2 Leistungsbeschreibung</h2>
              <p>
                (1) Der Dienst bietet eine digitale Plattform zur Verwaltung von Zimmerpflanzen.
                Dies umfasst unter anderem: Pflanzenverwaltung, Pflegepläne, Gieß-Erinnerungen,
                Pflanzen-Scanner, Statistiken, Einkaufslisten und Urlaubsplanung.
              </p>
              <p>
                (2) Der Anbieter stellt den Dienst in der jeweils aktuellen Version zur Verfügung.
                Es besteht kein Anspruch auf eine bestimmte Funktionalität oder ununterbrochene
                Verfügbarkeit.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 3 Registrierung und Konto</h2>
              <p>
                (1) Für die Nutzung des Dienstes ist eine Registrierung erforderlich. Der Nutzer
                muss wahrheitsgemäße Angaben machen.
              </p>
              <p>
                (2) Der Nutzer ist für die Sicherheit seiner Zugangsdaten selbst verantwortlich. Der
                Anbieter haftet nicht für Schäden, die durch unbefugte Nutzung des Kontos entstehen.
              </p>
              <p>
                (3) Der Nutzer kann sein Konto jederzeit löschen. Mit der Löschung werden alle
                personenbezogenen Daten entfernt, soweit keine gesetzlichen Aufbewahrungspflichten
                bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 4 Kostenlose und kostenpflichtige Leistungen</h2>
              <p>
                (1) Die Grundfunktionen des Dienstes stehen kostenlos zur Verfügung (Free-Tarif).
              </p>
              <p>
                (2) Erweiterte Funktionen können über ein kostenpflichtiges Abonnement
                (Premium-Tarif) genutzt werden. Die aktuellen Preise werden auf der Website
                angezeigt.
              </p>
              <p>
                (3) Abonnements verlängern sich automatisch um den gewählten Zeitraum, sofern sie
                nicht rechtzeitig vor Ablauf gekündigt werden.
              </p>
              <p>
                (4) Die Kündigung ist jederzeit zum Ende des aktuellen Abrechnungszeitraums möglich.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 5 Pflichten des Nutzers</h2>
              <p>Der Nutzer verpflichtet sich:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>den Dienst nur zu rechtmäßigen Zwecken zu nutzen,</li>
                <li>keine Inhalte hochzuladen, die rechtswidrig, beleidigend oder schädlich sind,</li>
                <li>die Rechte Dritter nicht zu verletzen,</li>
                <li>keine automatisierten Zugriffe auf den Dienst vorzunehmen, die dessen Funktion beeinträchtigen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 6 Haftung</h2>
              <p>
                (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für
                Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
              </p>
              <p>
                (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
                Vertragspflichten. Die Haftung ist in diesem Fall auf den vorhersehbaren,
                vertragstypischen Schaden begrenzt.
              </p>
              <p>
                (3) Pflegehinweise und Empfehlungen des Dienstes stellen keine Garantie für das
                Wohlbefinden von Pflanzen dar. Die Nutzung erfolgt auf eigene Verantwortung.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 7 Datenschutz</h2>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{' '}
                <Link to="/datenschutz" className="text-primary hover:underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 8 Änderungen der AGB</h2>
              <p>
                (1) Der Anbieter behält sich vor, diese AGB jederzeit zu ändern. Über wesentliche
                Änderungen wird der Nutzer rechtzeitig informiert.
              </p>
              <p>
                (2) Widerspricht der Nutzer den geänderten AGB nicht innerhalb von vier Wochen nach
                Benachrichtigung, gelten die neuen AGB als akzeptiert.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">§ 9 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
                UN-Kaufrechts.
              </p>
              <p>
                (2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die
                Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
              <p>
                (3) Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Fintutto UG. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
            <Link to="/agb" className="text-foreground font-medium">AGB</Link>
            <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
