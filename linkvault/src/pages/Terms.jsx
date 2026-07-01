import Layout from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="mt-2 space-y-3 text-sm text-muted">{children}</div>
    </div>
  );
}

export default function Terms() {
  return (
    <Layout>
      <Seo title="Terms of Service | LinkVault"
        description="Review the LinkVault terms of service, including acceptable use and our earnings disclaimer for affiliate marketing."
        path="/terms" />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated: January 15, 2025</p>

        <Section title="Acceptance of Terms">
          <p>By accessing or using LinkVault, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
        </Section>

        <Section title="Description of Service">
          <p>LinkVault provides a directory of free affiliate programs and a dashboard to help you organize and share affiliate links. We do not control the affiliate programs themselves and are not responsible for their terms, commissions, or payouts.</p>
        </Section>

        <Section title="Eligibility">
          <p>You must be at least 18 years old to use LinkVault. By using the service you represent that you meet this requirement.</p>
        </Section>

        <Section title="Acceptable Use">
          <p>You agree not to use LinkVault for spam, fraud, misleading promotion, or any activity that violates the terms of the affiliate programs or applicable law. You are solely responsible for how and where you share your affiliate links.</p>
        </Section>

        <Section title="Earnings Disclaimer">
          <p>Any earnings or income figures shown on LinkVault, including within the demo dashboard, are illustrative and simulated. They are not a promise or guarantee of actual results. Affiliate marketing income depends on many factors including effort, audience, and market conditions. You may earn little or nothing. LinkVault makes no guarantee of any specific outcome or income.</p>
        </Section>

        <Section title="Affiliate Links">
          <p>LinkVault contains affiliate links. Third-party programs set their own commission rates and payout terms, which may change at any time without notice.</p>
        </Section>

        <Section title="Intellectual Property">
          <p>All LinkVault branding, content, and design are owned by LinkVault. You may not copy or redistribute our content without permission.</p>
        </Section>

        <Section title="Limitation of Liability">
          <p>LinkVault is provided "as is" without warranties of any kind. To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
        </Section>

        <Section title="Changes to These Terms">
          <p>We may update these terms from time to time. Continued use of LinkVault after changes constitutes acceptance of the revised terms.</p>
        </Section>

        <Section title="Contact">
          <p>Questions about these terms? Email <a className="text-primary hover:underline" href="mailto:support@linkvault.io">support@linkvault.io</a>.</p>
        </Section>
      </div>
    </Layout>
  );
}
