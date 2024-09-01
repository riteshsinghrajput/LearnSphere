import { useHref, useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect } from "react";


const Privacy = () => {
    const location = useLocation();
   const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`

  return (
    <Layout>
    <div className="p-6  text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-black-500">Privacy Policy</h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Introduction</h2>
          <p>
            Welcome to LearnSphere ("we," "our," or "us"). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a  href = {url} className="cursor-pointer text-purple-500 underline">{url}</a> and use our Learning Management System (LMS). Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Information We Collect</h2>
          <h3 className="text-lg font-semibold mb-2 text-black">Personal Data</h3>
          <p>We may collect and process the following types of personal data:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Identity Data: Name, username or similar identifier, and date of birth.</li>
            <li>Contact Data: Address, email address, and phone numbers.</li>
            <li>Technical Data: Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li>Profile Data: Your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
            <li>Usage Data: Information about how you use our website, products, and services.</li>
            <li>Marketing and Communications Data: Your preferences in receiving marketing from us and your communication preferences.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2 mt-4 text-black">Non-Personal Data</h3>
          <p>
            We also collect, use, and share aggregated data such as statistical or demographic data for any purpose. Aggregated data may be derived from your personal data but is not considered personal data as this data does not directly or indirectly reveal your identity.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">How We Use Your Information</h2>
          <p>We use the information we collect in the following ways:</p>
          <ul className="list-disc list-inside ml-4">
            <li>To Provide and Manage Our Services: Including managing your account, providing access to our LMS, and processing transactions.</li>
            <li>To Improve Our Services: By understanding how our users interact with our LMS, we can enhance the user experience.</li>
            <li>To Communicate With You: We may send you updates, newsletters, and other information that may be of interest to you.</li>
            <li>For Marketing Purposes: With your consent, we may use your data to inform you about our products and services.</li>
            <li>To Ensure Security: To keep our platform secure and prevent fraud.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Disclosure of Your Information</h2>
          <p>We may share your personal data in the following situations:</p>
          <ul className="list-disc list-inside ml-4">
            <li>With Service Providers: We may share your information with third-party service providers who perform services on our behalf.</li>
            <li>For Legal Reasons: If required by law or to respond to legal process, we may disclose your personal data.</li>
            <li>Business Transfers: In the event of a merger, acquisition, or sale of assets, your personal data may be transferred to the new owner.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal data from accidental loss and unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Your Rights</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Access: You have the right to request a copy of the personal data we hold about you.</li>
            <li>Correction: You have the right to request correction of any inaccurate personal data we hold about you.</li>
            <li>Erasure: You have the right to request that we delete your personal data.</li>
            <li>Restriction: You have the right to request the restriction of processing of your personal data.</li>
            <li>Portability: You have the right to request the transfer of your personal data to another party.</li>
            <li>Objection: You have the right to object to the processing of your personal data where we are relying on a legitimate interest.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Children's Privacy</h2>
          <p>
            Our LMS is not intended for children under the age of 13. We do not knowingly collect personal data from children under 13. If we learn we have collected or received personal data from a child under 13, we will delete that information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-black">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>Email: mohitnehra895@gmail.com</p>
          <p>Address: building no. 116 Near bus stand Narwana , Jind Haryana India , 126116</p>
          <p>
            By using our LMS, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
    </Layout>
  );
};

export default Privacy;
