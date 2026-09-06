import type { Metadata } from "next";
import { credentials, portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Credentials", description: `Professional registration and selected BIM credentials of ${portfolio.name}.` };

export default function CredentialsPage() {
  const registration = portfolio.registrationDetails;

  return (
    <main>
      <section className="page-hero"><div className="shell page-hero-grid"><p className="mono-label">Registration / Credentials</p><div><h1 className="page-title">Professional registration backed by focused technical learning.</h1><p className="page-lead">Saudi professional accreditation comes first, supported by BIM and information-management training used within architectural and landscape delivery.</p></div></div></section>

      <section className="section-space section-rule">
        <div className="shell">
          <article className="registration-card">
            <div>
              <p className="mono-label">Professional registration</p>
              <h2>{registration.authority}</h2>
              <p>{registration.accreditation}</p>
            </div>
            <dl>
              <div><dt>Specialization</dt><dd>{registration.specialization}</dd></div>
              <div><dt>Membership no.</dt><dd>{registration.membership}</dd></div>
              <div><dt>Valid until</dt><dd>{registration.validUntil}</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section className="section-space section-rule">
        <div className="shell">
          <div className="section-heading"><div><p className="mono-label">Selected training</p><h2>BIM and information-management credentials.</h2></div></div>
          <div className="credentials-grid">{credentials.map((credential) => <article className="credential-card" key={credential.title}><img src={credential.image} alt={`${credential.title} certificate`} /><div><p className="mono-label">{credential.issuer}</p><h2>{credential.title}</h2>{credential.id && <p>Credential ID: {credential.id}</p>}</div></article>)}</div>
        </div>
      </section>
    </main>
  );
}
