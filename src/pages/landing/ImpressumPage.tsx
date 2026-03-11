import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/landing" className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-gradient">Zimmerpflanze</span>
            </Link>
            <Link
              to="/landing"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurueck
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">Angaben gemaess § 5 TMG</h2>
            <p className="text-muted-foreground leading-relaxed">
              Fintutto UG (haftungsbeschraenkt)<br />
              Kolonie 2<br />
              18317 Saal
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Vertreten durch</h2>
            <p className="text-muted-foreground leading-relaxed">
              Geschaeftsfuehrer: Alexander Deibel
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
            <p className="text-muted-foreground leading-relaxed">
              E-Mail: info@fintutto.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Registereintrag</h2>
            <p className="text-muted-foreground leading-relaxed">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Stralsund<br />
              Registernummer: [wird ergaenzt]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Umsatzsteuer-ID</h2>
            <p className="text-muted-foreground leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemaess § 27a Umsatzsteuergesetz:<br />
              [wird ergaenzt]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Verantwortlich fuer den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Alexander Deibel<br />
              Kolonie 2<br />
              18317 Saal
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Streitschlichtung</h2>
            <p className="text-muted-foreground leading-relaxed">
              Die Europaeische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Haftung fuer Inhalte</h2>
            <p className="text-muted-foreground leading-relaxed">
              Als Diensteanbieter sind wir gemaess § 7 Abs. 1 TMG fuer eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, uebermittelte oder
              gespeicherte fremde Informationen zu ueberwachen oder nach
              Umstaenden zu forschen, die auf eine rechtswidrige Taetigkeit
              hinweisen.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberuehrt. Eine diesbezuegliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung moeglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Haftung fuer Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unser Angebot enthaelt Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb koennen wir fuer
              diese fremden Inhalte auch keine Gewaehr uebernehmen. Fuer die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf moegliche Rechtsverstoesse
              ueberprueft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Urheberrecht</h2>
            <p className="text-muted-foreground leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung ausserhalb der Grenzen des Urheberrechtes beduerfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur fuer den privaten,
              nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Fintutto UG (haftungsbeschraenkt). Alle Rechte vorbehalten.
          <div className="mt-2 space-x-4">
            <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
