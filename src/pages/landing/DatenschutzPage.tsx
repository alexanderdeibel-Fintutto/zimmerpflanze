import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DatenschutzPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm">Stand: März 2026</p>

            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung ist:<br />
                Fintutto UG (haftungsbeschränkt)<br />
                [Straße und Hausnummer]<br />
                [PLZ Ort]<br />
                E-Mail: info@fintutto.de
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">2. Erhobene Daten</h2>
              <p>Wir erheben und verarbeiten folgende Daten:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Registrierungsdaten:</strong> E-Mail-Adresse, Passwort (verschlüsselt)</li>
                <li><strong>Nutzungsdaten:</strong> Angaben zu Pflanzen, Pflegehistorie, Wohnungen und Räumen</li>
                <li><strong>Technische Daten:</strong> IP-Adresse, Browsertyp, Zugriffszeitpunkt (in Server-Logs)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">3. Zweck der Datenverarbeitung</h2>
              <p>Die erhobenen Daten werden verwendet für:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Bereitstellung und Verbesserung des Dienstes</li>
                <li>Authentifizierung und Kontoverwaltung</li>
                <li>Erstellung individueller Pflegepläne und Erinnerungen</li>
                <li>Kommunikation bezüglich des Dienstes (z. B. Passwort-Zurücksetzung)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Rechtsgrundlage</h2>
              <p>
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                Bereitstellung und Verbesserung des Dienstes).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">5. Drittanbieter und Auftragsverarbeitung</h2>
              <p>Wir nutzen folgende Drittanbieter:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Supabase (Supabase Inc.):</strong> Hosting der Datenbank und
                  Authentifizierung. Server in der EU. Es besteht ein
                  Auftragsverarbeitungsvertrag.
                </li>
                <li>
                  <strong>Vercel (Vercel Inc.):</strong> Hosting der Webapplikation.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">6. Cookies und Speicherung im Browser</h2>
              <p>
                Der Dienst verwendet lokale Speichertechnologien (Local Storage) zur Verwaltung der
                Benutzer-Sitzung. Es werden keine Tracking-Cookies oder Drittanbieter-Cookies
                verwendet.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">7. Ihre Rechte</h2>
              <p>Sie haben gemäß DSGVO folgende Rechte:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Auskunft</strong> (Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> (Art. 16 DSGVO)</li>
                <li><strong>Löschung</strong> (Art. 17 DSGVO)</li>
                <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruch</strong> (Art. 21 DSGVO)</li>
              </ul>
              <p>
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: info@fintutto.de
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">8. Datenlöschung</h2>
              <p>
                Bei Löschung des Benutzerkontos werden alle personenbezogenen Daten entfernt, sofern
                keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Die Löschung erfolgt
                unverzüglich.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">9. Beschwerderecht</h2>
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn
                Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">10. Änderungen</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen, um sie an
                geänderte Rechtslagen oder Änderungen des Dienstes anzupassen.
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
            <Link to="/agb" className="hover:text-foreground transition-colors">AGB</Link>
            <Link to="/datenschutz" className="text-foreground font-medium">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
