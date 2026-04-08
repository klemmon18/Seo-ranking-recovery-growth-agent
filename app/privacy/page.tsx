export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <p>
        This application (“SEO Agent App”) is operated by Holistic Web Presence.
        This Privacy Policy explains how we collect, use, and protect information
        when you use this application and its associated services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you use this application, we may collect:
      </p>
      <ul>
        <li>Domain names submitted for SEO analysis</li>
        <li>Technical request data (such as timestamps and usage logs)</li>
      </ul>
      <p>
        We do not collect personal identifiable information unless explicitly provided.
      </p>

      <h2>How We Use Information</h2>
      <p>
        We use collected data solely to:
      </p>
      <ul>
        <li>Process SEO analysis requests</li>
        <li>Improve the performance and functionality of the application</li>
        <li>Ensure system reliability and security</li>
        <li>Provide our clients, who have provided us access to their information, strategic consultation</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        This application integrates with third-party services (such as SEO data providers)
        to retrieve ranking and keyword data. These services may process submitted domains
        in accordance with their own privacy policies.
      </p>

      <h2>Data Retention</h2>
      <p>
        We do not store submitted domain data long-term unless required for debugging,
        analytics, or service improvement. Logs may be retained temporarily.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement reasonable security measures to protect your data. However,
        no method of transmission over the Internet is 100% secure.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request deletion of any data associated with your usage by contacting us.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact:
        <br />
        Holistic Web Presence<br />
        Email: marketing@holisticwebpresence.com
      </p>

      <h2>Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. Updates will be posted on this page.
      </p>
    </main>
  );
}
