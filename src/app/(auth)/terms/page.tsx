import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-blue-100 text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-12 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to our SaaS AI platform. These terms and conditions
                outline the rules and regulations for the use of our service. By
                accessing and using our platform, you agree to comply with these
                terms.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing and using this service, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>You must be at least 18 years old to use our service</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
              </ul>
            </section>

            {/* Use License */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
                Use License
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Permission is granted to temporarily access our service for
                  personal, non-commercial transitory viewing only. This license
                  shall automatically terminate if you violate any of these
                  restrictions.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      You may not:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Modify or copy the materials</li>
                      <li>• Use for commercial purposes</li>
                      <li>• Reverse engineer the software</li>
                      <li>• Share account credentials</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      You may:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Use the service as intended</li>
                      <li>• Export your own data</li>
                      <li>• Cancel anytime</li>
                      <li>• Contact support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
                Privacy & Data Protection
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. We collect and use your
                information in accordance with our Privacy Policy. We implement
                appropriate security measures to protect your personal data.
              </p>
            </section>

            {/* Billing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
                Billing & Payments
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      All fees are charged in advance on a recurring basis
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Refunds are processed according to our refund policy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>You can cancel your subscription at any time</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-4">
                Disclaimer
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The information on this service is provided on an &quot;as
                is&quot; basis. To the fullest extent permitted by law, this
                company excludes all representations, warranties, conditions and
                terms relating to our service.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Questions?
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms & Conditions, please
                contact us.
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:sanchitmishra9795@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  sanchitmishra9795@gmail.com{" "}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
