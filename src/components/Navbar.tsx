"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

function Navbar() {

    const [nac, setNav] = useState(false)

    return (
        <div className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
            <div className='max-w-[1240px] m-auto flex justify-between items-center p-4 text-white'>
                <Link href='/'>
                    <h1 className='font-bold text-4xl'>LucasLens</h1>
                </Link>
                <ul className='hidden sm:flex'>
                    <li className='p-4'>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='p-4'>
                        <Link href='/'>About Me</Link>
                    </li>
                    <li className='p-4'>
                        <Link href='/'>Galery</Link>
                    </li>
                    <li className='p-4'>
                        <Link href='/'>Gear I Use</Link>
                    </li>
                    <li className='p-4'>
                        <Link href='/'>Contact</Link>
                    </li>
                </ul>

                {/* Mobile Button */}
                <div className='block sm:hidden z-10'>
                    <AiOutlineMenu size={20}  />
                </div>
                {/* Mobile Menu */}
                <div className='sm:hidden absolute top-0 left-0 right-0 bottom-0 felx 
                justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'>
                <ul>
                    <li className="p-4 text-4xl hover:text-gray-500">
                        <Link href='/'>Home</Link>
                    </li>
                    <li className="p-4 text-4xl hover:text-gray-500">
                        <Link href='/'>About Me</Link>
                    </li>
                    <li className="p-4 text-4xl hover:text-gray-500">
                        <Link href='/'>Galery</Link>
                    </li>
                    <li className="p-4 text-4xl hover:text-gray-500">
                        <Link href='/'>Gear I Use</Link>
                    </li>
                    <li className="p-4 text-4xl hover:text-gray-500">
                        <Link href='/'>Contact</Link>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;