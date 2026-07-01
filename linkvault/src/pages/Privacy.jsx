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

export default function Privacy() {
  return (
    <Layout>
      <Seo title="Privacy Policy | LinkVault"
        description="Read the LinkVault privacy policy, including how we use cookies, analytics, and third-party advertising such as Google AdSense."
        path="/privacy" />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: January 15, 2025</p>

        <Section title="Introduction">
          <p>LinkVault ("we", "us", "our") respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. By using LinkVault you agree to this policy.</p>
        </Section>

        <Section title="Information We Collect">
          <p>When you create an account, we store the name, email address, and password you provide. In this demo application, account information and activity data are stored locally in your browser's localStorage and are not transmitted to our servers.</p>
          <p>We may also automatically collect standard technical information such as browser type, device, and general usage patterns to improve the service.</p>
        </Section>

        <Section title="Cookies & Local Storage">
          <p>LinkVault uses browser local storage to remember your session and your dashboard data. Third-party partners may use cookies as described below. You can clear this data at any time through your browser settings.</p>
        </Section>

        <Section title="Third-Party Advertising (Google AdSense)">
          <p>We use third-party advertising companies, including Google AdSense, to serve ads when you visit LinkVault. These companies may use cookies and similar technologies to serve ads based on your prior visits to this and other websites.</p>
          <p>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a className="text-primary hover:underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
          <p>For more information about how Google uses data, see <a className="text-primary hover:underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites that use its services</a>.</p>
        </Section>

        <Section title="Affiliate Disclosure">
          <p>LinkVault contains affiliate links. When you click certain links and take a qualifying action, we may earn a commission at no additional cost to you.</p>
        </Section>

        <Section title="Data Security">
          <p>We take reasonable measures to protect your information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="Children's Privacy">
          <p>LinkVault is not directed to individuals under 18. We do not knowingly collect personal information from children.</p>
        </Section>

        <Section title="Your Rights">
          <p>You may access, update, or delete your account data at any time from the Settings page. Deleting your account removes your locally stored data.</p>
        </Section>

        <Section title="Contact">
          <p>Questions about this policy? Email us at <a className="text-primary hover:underline" href="mailto:support@linkvault.io">support@linkvault.io</a>.</p>
        </Section>
      </div>
    </Layout>
  );
}
