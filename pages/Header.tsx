import { useState } from 'react';
import Image from 'next/image';
import { GithubIcon, StarIcon } from 'lucide-react';
import logo from '../public/logo.png'; 6

export default function Header() {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "Image Converter", path: "/ConvertImage" },
        { title: "Youtube Video Download", path: "/YoutubeVideoDownload" },
        { title: "About Me", path: "https://github.com/ritstar" }
    ]

    return (
        <nav className="bg-slate-300 w-full border-b md:border-0 md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="/">
                        <Image
                            src={logo}
                            width={70}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <div className="md:hidden">
                        <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                        <a href={item.path}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <a href='https://github.com/ritstar/next-app' target='_blank'>
                    <button className={`flex font-mono justify-center min-w-max items-center px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200 md:block ${state ? 'block' : 'hidden'}`}>
                        <div className='flex flex-row my-2'>
                            <StarIcon className='w-5 h-5 mr-2' size={30} /><span>this project on</span><GithubIcon className='w-5 h-5 ml-2' size={30} />
                        </div>
                    </button>
                </a>
            </div>
        </nav>
    )
}