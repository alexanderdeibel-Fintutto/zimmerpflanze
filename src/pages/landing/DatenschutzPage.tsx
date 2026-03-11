import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function DatenschutzPage() {
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
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklaerung</h1>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-medium mb-2 mt-4">Allgemeine Hinweise</h3>
            <p className="text-muted-foreground leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Ueberblick darueber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persoenlich identifiziert werden koennen. Ausfuehrliche
              Informationen zum Thema Datenschutz entnehmen Sie unserer unter
              diesem Text aufgefuehrten Datenschutzerklaerung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Verantwortliche Stelle
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Die verantwortliche Stelle fuer die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Fintutto UG (haftungsbeschraenkt)<br />
              Kolonie 2<br />
              18317 Saal<br />
              <br />
              Geschaeftsfuehrer: Alexander Deibel<br />
              E-Mail: info@fintutto.de
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Verantwortliche Stelle ist die natuerliche oder juristische Person,
              die allein oder gemeinsam mit anderen ueber die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten (z. B. Namen,
              E-Mail-Adressen o. Ae.) entscheidet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Wer ist verantwortlich fuer die Datenerfassung auf dieser Website?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten koennen Sie dem Abschnitt
              „Verantwortliche Stelle" in dieser Datenschutzerklaerung
              entnehmen.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Wie erfassen wir Ihre Daten?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie
              bei der Registrierung eingeben.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
              Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
              allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
              Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
              automatisch, sobald Sie diese Website betreten.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Wofuer nutzen wir Ihre Daten?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie
              Bereitstellung der Website zu gewaehrleisten. Andere Daten koennen
              zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Welche Rechte haben Sie bezueglich Ihrer Daten?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft ueber
              Herkunft, Empfaenger und Zweck Ihrer gespeicherten
              personenbezogenen Daten zu erhalten. Sie haben ausserdem ein Recht,
              die Berichtigung oder Loeschung dieser Daten zu verlangen. Wenn
              Sie eine Einwilligung zur Datenverarbeitung erteilt haben, koennen
              Sie diese Einwilligung jederzeit fuer die Zukunft widerrufen.
              Ausserdem haben Sie das Recht, unter bestimmten Umstaenden die
              Einschraenkung der Verarbeitung Ihrer personenbezogenen Daten zu
              verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der
              zustaendigen Aufsichtsbehoerde zu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Hosting und Content Delivery
            </h2>
            <h3 className="text-lg font-medium mb-2 mt-4">Vercel</h3>
            <p className="text-muted-foreground leading-relaxed">
              Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, werden
              Ihre personenbezogenen Daten auf den Servern von Vercel
              verarbeitet. Hierbei koennen auch personenbezogene Daten an den
              Sitz von Vercel in den USA uebermittelt werden. Die
              Datenuebertragung in die USA wird auf die
              EU-Standardvertragsklauseln gestuetzt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Allgemeine Hinweise und Pflichtinformationen
            </h2>

            <h3 className="text-lg font-medium mb-2 mt-4">Datenschutz</h3>
            <p className="text-muted-foreground leading-relaxed">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persoenlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklaerung.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Die verantwortliche Stelle fuer die Datenverarbeitung auf dieser
              Website ist im Abschnitt „Verantwortliche Stelle" aufgefuehrt.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">Speicherdauer</h3>
            <p className="text-muted-foreground leading-relaxed">
              Soweit innerhalb dieser Datenschutzerklaerung keine speziellere
              Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
              Daten bei uns, bis der Zweck fuer die Datenverarbeitung entfaellt.
              Wenn Sie ein berechtigtes Loeschersuchen geltend machen oder eine
              Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
              geloescht, sofern wir keine anderen rechtlich zulaessigen Gruende
              fuer die Speicherung Ihrer personenbezogenen Daten haben.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              SSL- bzw. TLS-Verschluesselung
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgruenden und zum Schutz der
              Uebertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die
              Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
              TLS-Verschluesselung. Eine verschluesselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von „http://" auf
              „https://" wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Datenerfassung in der App
            </h2>

            <h3 className="text-lg font-medium mb-2 mt-4">Registrierung</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sie koennen sich auf unserer Website registrieren, um zusaetzliche
              Funktionen zu nutzen. Die dabei eingegebenen Daten verwenden wir
              nur zum Zwecke der Nutzung des jeweiligen Angebotes, fuer das Sie
              sich registriert haben. Die bei der Registrierung abgefragten
              Pflichtangaben muessen vollstaendig angegeben werden. Anderenfalls
              werden wir die Registrierung ablehnen.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Pflanzendaten und Pflegeinformationen
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Wir speichern Daten zu Ihren Pflanzen, Wohnungen, Raeumen und
              Pflegeaktivitaeten, um Ihnen die Funktionen unserer App
              bereitzustellen. Diese Daten werden sicher in unserer Datenbank
              (Supabase) gespeichert und sind nur fuer Sie zugaenglich (Row
              Level Security).
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Browser-Benachrichtigungen
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Wenn Sie Browser-Benachrichtigungen aktivieren, werden diese lokal
              auf Ihrem Geraet verarbeitet. Es werden keine zusaetzlichen Daten
              an uns uebermittelt.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4">
              Pflanzen-Scanner (KI-Erkennung)
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Wenn Sie den Pflanzen-Scanner nutzen, werden Ihre Fotos an einen
              externen KI-Dienst zur Pflanzenerkennung uebermittelt. Die Fotos
              werden nicht dauerhaft gespeichert und nur fuer den Zweck der
              Erkennung verarbeitet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Ihre Rechte als Betroffener
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie
              Betroffener im Sinne der DSGVO und es stehen Ihnen folgende Rechte
              gegenueber dem Verantwortlichen zu:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
              <li>Auskunftsrecht (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Loeschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschraenkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenuebertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
              <li>
                Recht auf Widerruf einer datenschutzrechtlichen Einwilligung
                (Art. 7 Abs. 3 DSGVO)
              </li>
              <li>
                Beschwerderecht bei einer Aufsichtsbehoerde (Art. 77 DSGVO)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Aktualitaet und Aenderung dieser Datenschutzerklaerung
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Diese Datenschutzerklaerung ist aktuell gueltig und hat den Stand
              Maerz 2026.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Durch die Weiterentwicklung unserer Website und Angebote oder
              aufgrund geaenderter gesetzlicher beziehungsweise behoerdlicher
              Vorgaben kann es notwendig werden, diese Datenschutzerklaerung zu
              aendern. Die jeweils aktuelle Datenschutzerklaerung kann jederzeit
              auf dieser Website abgerufen werden.
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
