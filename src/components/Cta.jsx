// export default function Cta() {
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
//                 <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
//                     <svg
//                         viewBox="0 0 1024 1024"
//                         aria-hidden="true"
//                         className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
//                     >
//                         <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
//                         <defs>
//                             <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
//                                 <stop stopColor="#7775D6" />
//                                 <stop offset={1} stopColor="#E935C1" />
//                             </radialGradient>
//                         </defs>
//                     </svg>
//                     <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
//                         <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
//                             Start Securing Your Website in Minutes
//                         </h2>
//                         <p className="mt-6 text-pretty text-lg/8 text-gray-300">
//                             AuthMate makes it easy to integrate secure user authentication with just a few lines of code. Get started today and ensure your website is protected.
//                         </p>
//                         <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
//                             <a
//                                 to="/auth/login/"
//                                 className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//                             >
//                                 Get Started Free
//                             </a>
//                             <a
//                                 to="#learn-more"
//                                 className="text-sm/6 font-semibold text-white"
//                             >
//                                 Learn More <span aria-hidden="true">→</span>
//                             </a>
//                         </div>
//                     </div>
//                     <div className="relative mt-16 h-80 lg:mt-8">
//                         <img
//                             alt="AuthMate Dashboard Screenshot"
//                             src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
//                             width={1824}
//                             height={1080}
//                             className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

import { motion } from 'framer-motion'
import Button from "@/components/ui/Button"


export default function Cta() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative isolate overflow-hidden rounded-3xl"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 dark:opacity-40" />
              <div className="absolute inset-0 backdrop-blur-3xl" />
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Start Securing Your Website in Minutes
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                AuthMate makes it easy to integrate secure user authentication with just a few lines of code. Get started today and ensure your website is protected.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button to="/auth/login">Get Started Free</Button>
                <Button to="#learn-more" variant="secondary">Learn More</Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative mx-auto w-[24rem] max-w-full overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-900/10 dark:ring-white/10"
              >
                <img
                  src="/placeholder.svg?height=600&width=400"
                  alt="Dashboard preview"
                  className="w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

