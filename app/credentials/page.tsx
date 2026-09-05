import type { Metadata } from "next";
import { credentials } from "@/data/portfolio";

export const metadata: Metadata = { title: "Credentials", description: "BIM and ISO 19650 credentials completed by Shaher Waheed Roshdy." };

export default function CredentialsPage() {
  return (
    <main>
      <section className="page-hero"><div className="shell page-hero-grid"><p className="mono-label">Credentials / BIM</p><div><h1 className="page-title">Professional learning that strengthens delivery.</h1><p className="page-lead">Selected BIM and information-management training supporting accurate, ISO 19650-aware project documentation.</p></div></div></section>
      <section className="section-space"><div className="shell credentials-grid">{credentials.map((credential) => <article className="credential-card" key={credential.title}><img src={credential.image} alt={`${credential.title} certificate`} /><div><p className="mono-label">{credential.issuer}</p><h2>{credential.title}</h2>{credential.id && <p>Credential ID: {credential.id}</p>}</div></article>)}</div></section>
    </main>
  );
}
