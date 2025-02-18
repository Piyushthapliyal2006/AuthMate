"use client"
import { motion } from 'framer-motion'
import { MailIcon, PhoneIcon, MapPinIcon, GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-react'
import Header from '@/components/Headers'
import Footer from '@/components/Footer'
import Button from '@/components/ui/Button'
import { Input } from "@/components/ui/Input"


const contactInfo = [
  {
    name: 'Email',
    description: 'Contact us via email for support or inquiries.',
    icon: MailIcon,
    link: 'mailto:support@authmate.xyz',
    value: 'support@authmate.xyz'
  },
  {
    name: 'Phone',
    description: 'Call us for direct assistance.',
    icon: PhoneIcon,
    link: 'tel:+918178347459',
    value: '+91 8178347459'
  },
  {
    name: 'Location',
    description: 'Visit our office for in-person inquiries.',
    icon: MapPinIcon,
    value: '123 Main Street, Delhi, India'
  }
]

const socialLinks = [
  {
    icon: GithubIcon,
    link: 'https://github.com/yourprofile',
  },
  {
    icon: TwitterIcon,
    link: 'https://twitter.com/yourprofile',
  },
  {
    icon: LinkedinIcon,
    link: 'https://linkedin.com/in/yourprofile',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Contact() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-900 content-container">
        <div className="py-24 sm:py-32 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <motion.h2 variants={itemVariants} className="text-base font-semibold leading-7 text-primary">
                Contact Us
              </motion.h2>
              <motion.p variants={itemVariants} className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                We're here to help!
              </motion.p>
              <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Feel free to reach out to us through any of the following ways:
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            >
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
                  >
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                      <info.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                      {info.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                      {info.link ? (
                        <a href={info.link} className="text-primary hover:underline">
                          {info.value}
                        </a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                      <p className="mt-2">{info.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            >
              <div className="text-center">
                <motion.h3 variants={itemVariants} className="text-xl font-semibold leading-7 text-gray-900 dark:text-gray-100">
                  Get in Touch
                </motion.h3>
                <motion.p variants={itemVariants} className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  Send us a message and we’ll get back to you as soon as possible.
                </motion.p>
              </div>

              <motion.form
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0"
                action="submit"
              >
                <div>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    label="Your Name"
                    required
                    className="min-w-0 flex-auto"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    label="Your Email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="sm:col-span-2 text-center">
                  <Button
                    type="submit"
                    className="inline-block mt-4"
                  >
                    Send Message
                  </Button>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
