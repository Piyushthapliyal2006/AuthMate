import Header from '@/components/Headers';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function TermsnConditions() {
    return (
        <>
            {/* Sticky animated Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-lg"
            >
                <Header />
            </motion.div>

            {/* Main page content */}
            <main className="min-h-screen pt-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="py-12"
                >
                    <section className="bg-gray-50 dark:bg-gray-800 py-10">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                Terms and Conditions
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                                Last updated on May 10th, 2025
                            </p>

                            <p className="mb-6">
                                For the purpose of these Terms and Conditions, the term <strong>"we", "us", "our"</strong> refers to <strong>Anmol</strong>, whose registered office is at <em>EAST BABARPUR, Shahdara, GALI NO.- 03, E-679 / U.G.F, SANJAY GANDHI MARG, Babar Pur, North East Delhi 110032</em>. The terms <strong>"you", "your", "user", "visitor"</strong> refer to any person who accesses or uses this website or engages in transactions with us.
                            </p>

                            <h2 className="text-xl font-semibold mb-4">Your use of the website and/or purchase from us is governed by the following terms:</h2>

                            <ul className="list-disc list-inside space-y-3 mb-6 text-gray-700 dark:text-gray-300">
                                <li>The content of this website is subject to change without notice.</li>
                                <li>No warranty or guarantee is provided regarding the accuracy, performance, or completeness of content. We exclude liability for inaccuracies or errors to the fullest extent permitted by law.</li>
                                <li>Your use of the website is at your own risk. It is your responsibility to ensure any information or products meet your needs.</li>
                                <li>The site includes proprietary content owned or licensed to us, including layout and design. Reproduction is prohibited unless in accordance with the copyright notice.</li>
                                <li>Trademarks reproduced on this site, not owned by us, are acknowledged appropriately.</li>
                                <li>Unauthorized use of site content may result in legal claims or criminal liability.</li>
                                <li>Our site may contain external links for convenience. We do not endorse or assume responsibility for linked content.</li>
                                <li>Links to this site may not be created without our prior written consent.</li>
                                <li>Any disputes shall be governed by the laws of India.</li>
                                <li>We are not liable for any transaction failures due to authorization declines from banks or payment gateways.</li>
                            </ul>

                            <p className="text-gray-700 dark:text-gray-300">
                                By using our website and/or engaging with our services, you agree to these Terms and Conditions. If you do not accept any part of these terms, please refrain from using the website.
                            </p>
                        </div>
                    </section>
                </motion.div>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
