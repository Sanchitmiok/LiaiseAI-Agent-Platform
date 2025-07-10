"use client";
import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface Section {
  id: string;
  title: string;
  content: string[];
}

const privacySections: Section[] = [
  {
    id: "information-collection",
    title: "Information We Collect",
    content: [
      "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.",
      "Personal information may include your name, email address, phone number, and payment information.",
      "We automatically collect certain information about your device and usage patterns when you use our services.",
    ],
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    content: [
      "To provide, maintain, and improve our services",
      "To process transactions and send related information",
      "To send technical notices, updates, security alerts, and support messages",
      "To respond to your comments, questions, and customer service requests",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    content: [
      "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.",
      "We may share information in response to legal requests or to protect our rights and safety.",
      "We may share aggregated, non-personally identifiable information publicly.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      "We implement appropriate security measures to protect your personal information.",
      "We use encryption for sensitive data transmission and storage.",
      "Regular security audits and updates are performed to maintain data protection standards.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    content: [
      "We use cookies and similar technologies to enhance your experience and analyze usage patterns.",
      "You can control cookie preferences through your browser settings.",
      "Essential cookies are necessary for basic functionality and cannot be disabled.",
    ],
  },
  {
    id: "user-rights",
    title: "Your Rights and Choices",
    content: [
      "You have the right to access, update, or delete your personal information.",
      "You can opt-out of marketing communications at any time.",
      "You may request data portability or restriction of processing in certain circumstances.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const expandAll = () => {
    setExpandedSections(new Set(privacySections.map((section) => section.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const filteredSections = privacySections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.some((content) =>
        content.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the
            security of your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search privacy policy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              This Privacy Policy describes how we collect, use, and protect
              your information when you use our services. By using our services,
              you agree to the collection and use of information in accordance
              with this policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to ensuring that your privacy is protected and
              that we comply with applicable data protection laws.
            </p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                {expandedSections.has(section.id) ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedSections.has(section.id) && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-3">
                    {section.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">
              No sections found matching your search.
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Questions About This Policy?
          </h3>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or our
            practices, please contact us:
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Email: sanchitmishra9795@gmail.com</p>
            <p>Phone: +91 7217643584</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} LiaiseAI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
