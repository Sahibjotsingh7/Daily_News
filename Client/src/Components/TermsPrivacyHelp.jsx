import React from "react";
import "../App.css"; // Optional: Add styling

const TermsPrivacyHelp = () => {
  return (
    <div className="terms-privacy-help-container">
      <h1>Terms, Privacy Policy & Help</h1>

      <section>
        <h2>Terms of Service</h2>
        <p><strong>Last Updated: March 04, 2025</strong></p>
        <p>
          Welcome to [Your Website Name] ("we," "us," or "our"). By accessing or using our website, you agree to comply with and be bound by the following Terms of Service ("Terms"). If you do not agree, please do not use our services.
        </p>
        <ul>
          <li>
            <strong>Use of Service</strong>: You may use our platform to read, write, and share news articles. You must be at least 13 years old to use this service.
          </li>
          <li>
            <strong>User Conduct</strong>: You agree not to post unlawful, harmful, or misleading content. We reserve the right to remove content or suspend accounts violating these Terms.
          </li>
          <li>
            <strong>Community Guidelines for Writing Articles</strong>: When writing articles, you must adhere to our community guidelines. Articles must be original, respectful, and free from hate speech, discrimination, or misinformation. The use of unfair content, such as plagiarism, defamatory statements, or content intended to deceive or harm others, is strictly prohibited.
          </li>
          <li>
            <strong>Content Moderation</strong>: If your article violates these Terms or our community guidelines, it may be deleted by an admin without prior notice. Repeated violations or severe breaches (e.g., posting unfair or harmful content) may result in a permanent ban of your account.
          </li>
          <li>
            <strong>Intellectual Property</strong>: Content you upload remains yours, but you grant us a non-exclusive, royalty-free license to display it on our platform.
          </li>
          <li>
            <strong>Termination</strong>: We may terminate or suspend your access at our discretion, with or without notice, for any violation of these Terms, including breaches of our community guidelines.
          </li>
        </ul>
      </section>

      <section>
        <h2>Privacy Policy</h2>
        <p><strong>Last Updated: March 04, 2025</strong></p>
        <p>We value your privacy and are committed to protecting your personal information.</p>
        <ul>
          <li>
            <strong>Information We Collect</strong>: We collect data you provide (e.g., name, email) and usage data (e.g., IP address, browsing activity) when you use our site.
          </li>
          <li>
            <strong>How We Use It</strong>: Your data is used to provide and improve our services, personalize content, and communicate with you.
          </li>
          <li>
            <strong>Sharing</strong>: We do not sell your personal data. It may be shared with service providers (e.g., hosting) or as required by law.
          </li>
          <li>
            <strong>Cookies</strong>: We use cookies to enhance your experience. You can manage preferences via your browser settings.
          </li>
          <li>
            <strong>Your Rights</strong>: You may request access, correction, or deletion of your data by contacting us at [support@email.com].
          </li>
        </ul>
      </section>

      <section>
        <h2>Help</h2>
        <p>Need assistance? Here’s how we can help:</p>
        <ul>
          <li>
            <strong>Account Issues</strong>: Forgot your password? Use the "Forgot Password" link on the login page.
          </li>
          <li>
            <strong>Content Guidelines</strong>: Ensure articles are original, respectful, and comply with our Terms and community guidelines.
          </li>
          <li>
            <strong>Contact Us</strong>: For further support, email us at [support@email.com] or use our live chat (available soon).
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TermsPrivacyHelp;