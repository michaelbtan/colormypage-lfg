import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the terms and conditions for using ColorMyPage's free coloring pages and services.",
  openGraph: {
    title: "ColorMyPage Terms & Conditions",
    description: "Read the terms and conditions for using ColorMyPage's free coloring pages and services.",
    type: "website",
    url: "https://colormypage.com/terms-and-conditions",
    siteName: "ColorMyPage",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ColorMyPage Terms & Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorMyPage Terms & Conditions",
    description: "Read the terms and conditions for using ColorMyPage's free coloring pages and services.",
    images: ["/logo.png"],
  },
};

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 my-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p>Last updated: May 08, 2023</p>

      <p className="mt-4">
        Please read these terms and conditions carefully before using Our Service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Interpretation and Definitions</h2>
      <h3 className="font-semibold mt-4">Interpretation</h3>
      <p>
        The words with an initial capital letter have meanings defined under the following conditions. These definitions apply regardless of whether they appear in singular or plural.
      </p>

      <h3 className="font-semibold mt-4">Definitions</h3>
      <p>For the purposes of these Terms and Conditions:</p>
      <ul className="list-disc ml-6 mt-2">
        <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where “control” means ownership of 50% or more of voting shares or interests.</li>
        <li><strong>Country</strong> refers to: Georgia, United States.</li>
        <li><strong>Company</strong> (referred to as either “the Company,” “We,” “Us,” or “Our”) refers to ColorMyPage.com.</li>
        <li><strong>Device</strong> means any device that can access the Service, such as a computer, cellphone, or tablet.</li>
        <li><strong>Service</strong> refers to the Website.</li>
        <li><strong>Terms and Conditions</strong> (also referred to as “Terms”) mean these Terms and Conditions that form the agreement between You and the Company.</li>
        <li><strong>Third-party Social Media Service</strong> means any services or content provided by a third party that may be displayed, included, or made available by the Service.</li>
        <li><strong>Website</strong> refers to ColorMyPage.com, accessible from https://colormypage.com/</li>
        <li><strong>You</strong> means the individual or entity accessing or using the Service.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Acknowledgment</h2>
      <p>
        These Terms and Conditions govern Your use of the Service and constitute the agreement between You and the Company. Your access to and use of the Service is conditioned on Your acceptance of these Terms and Our Privacy Policy.
      </p>
      <p>
        By accessing or using the Service, You agree to be bound by these Terms. If You disagree, please do not use the Service.
      </p>
      <p>You represent that you are over 18 years old. The Service is not intended for those under 18.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Links to Other Websites</h2>
      <p>
        Our Service may contain links to third-party websites or services not owned or controlled by the Company. We are not responsible for the content, privacy policies, or practices of any third-party sites.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Termination</h2>
      <p>
        We may terminate or suspend Your access to the Service immediately, without prior notice or liability, for any reason, including if You breach these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p>
        The Company’s total liability under these Terms is limited to the greater of $100 USD or the amount actually paid by You through the Service. We are not liable for indirect, incidental, special, or consequential damages.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">“AS IS” and “AS AVAILABLE” Disclaimer</h2>
      <p>
        The Service is provided “AS IS” and “AS AVAILABLE” without warranties of any kind. We do not guarantee that the Service will meet Your needs or be error-free.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Governing Law</h2>
      <p>
        The laws of the State of Georgia, United States, govern these Terms and Your use of the Service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Disputes Resolution</h2>
      <p>
        If You have a dispute, You agree to attempt to resolve it informally by contacting Us.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">For European Union (EU) Users</h2>
      <p>
        If You are an EU consumer, You will benefit from any mandatory provisions of the law of the country where You are resident.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">United States Legal Compliance</h2>
      <p>
        You warrant that You are not located in a country subject to U.S. sanctions and are not on any U.S. government list of prohibited parties.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Severability and Waiver</h2>
      <p>
        If any provision is unenforceable, it will be modified to achieve its purpose as much as possible, and the rest of the Terms remain in effect.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Translation Interpretation</h2>
      <p>
        If these Terms have been translated, the original English version shall prevail in case of dispute.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Changes to These Terms</h2>
      <p>
        We may update these Terms at Our sole discretion. Material changes will be notified at least 30 days in advance. By continuing to use the Service after changes, You agree to be bound by the new Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have any questions, please contact us at <Link href="/contact" className="text-blue-600 underline">Contact Us</Link>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
