"use client"

import { motion } from 'framer-motion'
import { LinkedinIcon, InstagramIcon } from 'lucide-react'

const people = [
  {
    name: 'Anmol',
    role: 'Founder / CEO',
    imageUrl: 'https://res.cloudinary.com/dkepj7fr9/image/upload/ar_1.0,c_fill,g_north,h_256,w_256/v1736087693/dev2_f8n5lb_1_11zon_qw2y70.webp',
    linkedin: 'https://www.linkedin.com/in/anmol-776877294/',
    instagram: 'https://www.instagram.com/i_am.anmol/',
  },
  {
    name: 'Ayush Thakur',
    role: 'Co-Founder',
    imageUrl: '/placeholder.svg?height=256&width=256',
    linkedin: 'https://www.linkedin.com/in/ayush-profile',
    instagram: 'https://www.instagram.com/realayushhoon/',
  },
  {
    name: 'Abhinav Tyagi',
    role: 'Co-Founder',
    imageUrl: '/placeholder.svg?height=256&width=256',
    linkedin: 'https://www.linkedin.com/in/abhinav-profile',
    instagram: 'https://www.instagram.com/_abhinavtyagi__/',
  },
  {
    name: 'Rahul Singh Bhist',
    role: 'Co-Founder',
    imageUrl: '/placeholder.svg?height=256&width=256',
    linkedin: 'https://www.linkedin.com/in/rahul-profile',
    instagram: 'https://www.instagram.com/singh_rahul.99/',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Team() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl lg:mx-0"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Meet our leadership
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {people.map((person) => (
            <motion.li
              key={person.name}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                className="aspect-square w-full rounded-2xl object-cover"
                src={person.imageUrl}
                alt={person.name}
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900 dark:text-white">{person.name}</h3>
              <p className="text-base leading-7 text-primary">{person.role}</p>
              <div className="mt-6 flex gap-6">
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <LinkedinIcon className="h-6 w-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href={person.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <InstagramIcon className="h-6 w-6" />
                </motion.a>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

