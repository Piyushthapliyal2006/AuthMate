import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Adjust based on your icon imports
import { CloudArrowUpIcon, ServerIcon, LockClosedIcon } from '@heroicons/react/24/outline'; // Feature icons

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: '/docs' },
    { name: 'Product', href: '/product' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blogs', href: '/blogs' },
];

const features = [
    {
        name: 'Quick Integration',
        description: 'Effortless API integration with full guides to get your authentication system live fast. Perfect for developers looking to save time and focus on core features.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Powerful User Dashboard',
        description: 'Manage and monitor your users easily across all your projects from a single, intuitive dashboard. Stay informed and in control with detailed insights and tools.',
        icon: ServerIcon,
    },
    {
        name: 'Unique Project Credentials',
        description: 'Create unique API keys for each project to enhance security and maintain control. Ideal for developers managing multiple websites or applications.',
        icon: LockClosedIcon,
    },
];

export default function BetaAnnouncementPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">AuthMate</span>
                            <img
                                alt="AuthMate Logo"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link to="/auth/login" className="text-sm/6 font-semibold text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"
                >
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                            Announcing the Beta Version of AuthMate!
                        </h1>
                        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
                            We are excited to bring you the beta version of AuthMate. Start integrating secure authentication today and be ready for the full version launching on <strong>1st January 2025!</strong>
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/auth/login"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get Started Free
                            </Link>
                            <Link to="#features" className="text-sm/6 font-semibold text-gray-900">
                                Learn More <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="overflow-hidden bg-white py-24 sm:py-32" id='features'>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base/7 font-semibold text-indigo-600">Beta Features</h2>
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    A better workflow during Beta
                                </p>
                                <p className="mt-6 text-lg/8 text-gray-600">
                                    AuthMate helps you seamlessly integrate authentication, manage users, and keep your platforms secure without the hassle. Start today during our beta phase!
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                                {feature.name}
                                            </dt>
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img
                            alt="AuthMate dashboard"
                            src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                            width={2432}
                            height={1442}
                            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                Start Securing Your Website in Minutes
                            </h2>
                            <p className="mt-6 text-lg/8 text-gray-300">
                                AuthMate makes it easy to integrate secure user authentication with just a few lines of code. Join our beta and start protecting your platform today.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <a
                                    href="/auth/login"
                                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Get Started Free
                                </a>
                                <a
                                    href="#learn-more"
                                    className="text-sm/6 font-semibold text-white"
                                >
                                    Learn More <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
