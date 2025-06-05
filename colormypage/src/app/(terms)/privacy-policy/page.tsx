import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about how ColorMyPage collects, uses, and protects your personal information.",
  openGraph: {
    title: "ColorMyPage Privacy Policy",
    description: "Learn about how ColorMyPage collects, uses, and protects your personal information.",
    type: "website",
    url: "https://colormypage.com/privacy-policy",
    siteName: "ColorMyPage",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ColorMyPage Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorMyPage Privacy Policy",
    description: "Learn about how ColorMyPage collects, uses, and protects your personal information.",
    images: ["/logo.png"],
  },
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 my-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">Last updated: June 01, 2025</p>

      <p className="mb-4">
        This Privacy Policy explains how ColorMyPage.com ("we," "us," or "our") collects, uses, discloses, and protects your information when you use our website, create an account, and interact with features such as favoriting categories and coloring pages.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li><strong>Personal Information:</strong> When you create an account, we may collect your name, email address, and password.</li>
        <li><strong>Usage Data:</strong> We collect information about how you use our site, including your favorited categories and coloring pages, and your interactions with our services.</li>
        <li><strong>Device and Technical Data:</strong> We may collect information such as your IP address, browser type, operating system, and device identifiers.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>To provide and improve our services, including saving your favorites and personalizing your experience.</li>
        <li>To create and manage your account, authenticate your access, and provide customer support.</li>
        <li>To send you occasional updates about new features, unless you opt out.</li>
        <li>To monitor site performance, prevent fraud, and maintain security.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p>
        We do not sell or rent your personal data. We may share your information in the following cases:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>With trusted service providers who assist us (e.g., hosting, analytics), bound by confidentiality agreements.</li>
        <li>When required by law, regulation, or legal process.</li>
        <li>In connection with a business transfer (e.g., merger, sale of assets).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies and similar technologies to improve user experience, analyze trends, and administer the website. You can control cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights and Choices</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>You may access, update, or delete your account information by logging into your account settings.</li>
        <li>You can request the deletion of your account and associated data by contacting us at <a href="mailto:contact@colormypage.com" className="text-blue-600 underline">contact@colormypage.com</a>.</li>
        <li>Residents of the European Economic Area (EEA) or California (CCPA) have additional data rights. Please contact us if you wish to exercise these rights.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Data Security</h2>
      <p>
        We implement reasonable security measures to protect your data. However, no system can guarantee absolute security. We encourage you to use strong passwords and protect your login information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Children's Privacy</h2>
      <p>
        We do not knowingly collect personal information from children under the age of 13. If you believe we have unintentionally collected such information, please contact us, and we will take appropriate action.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on this page with the revised date. Please review it periodically.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p>
        If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:contact@colormypage.com" className="text-blue-600 underline">contact@colormypage.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
