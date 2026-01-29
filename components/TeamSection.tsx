import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils' // Assuming this exists based on package.json clsx/tailwind-merge
import { Section } from '@/components/Section' // Assuming this exists

// Fallback for cn if not found in typical location, but usually it's there. 
// I'll assume standard Shadcn/Tailwind setup. If error, I'll fix.
// Actually, I should check if lib/utils exists.
// Based on previous `ls` output, `Section` exists.

const teamMembers = [
  {
    id: 1,
    name: 'Founder Name',
    role: 'Founder',
    bio: 'With over 20 years of experience in the furniture industry, leading the vision of Fab Seating to create spaces that inspire.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', // Placeholder
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    id: 2,
    name: 'Co-Founder Name',
    role: 'Co-Founder',
    bio: 'A design enthusiast with a passion for ergonomics and aesthetics, ensuring every piece meets our high standards of quality.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', // Placeholder
    socials: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 3,
    name: 'Key Member Name',
    role: 'Head of Operations',
    bio: 'Ensuring smooth execution from manufacturing to delivery, making sure your experience with Fab Seating is seamless.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80', // Placeholder
    socials: {
      linkedin: '#',
      email: 'mailto:hello@fabseating.com'
    }
  }
]

export const TeamSection = () => {
  return (
    <Section className="bg-primary-50/30 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700 mb-2 block">Our Leadership</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-950 mb-3">Meet the Minds Behind Fab Seating</h2>
          <div className="w-16 h-px bg-primary-200 mx-auto"></div>
        </div>

        <div className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Side - Stylish Offset Frame */}
              <div className="relative group shrink-0">
                {/* Offset Decorative Border */}
                <div className={`absolute top-3 ${index % 2 === 1 ? '-right-3' : '-left-3'} w-full h-full border-2 border-primary-200 rounded-2xl -z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1`}></div>
                <div className={`absolute -inset-1 bg-primary-100/50 rounded-[1.2rem] -z-20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Main Image */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-2xl shadow-sm bg-primary-50">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className={`flex-1 text-center ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                <h3 className="text-2xl font-serif font-bold text-primary-950 mb-1">{member.name}</h3>
                <div className={`flex items-center gap-3 mb-4 justify-center ${index % 2 === 1 ? 'md:justify-end' : 'md:justify-start'}`}>
                  {index % 2 === 1 && <span className="hidden md:block w-8 h-px bg-primary-300"></span>}
                  <p className="text-primary-600 font-medium tracking-wider uppercase text-xs">{member.role}</p>
                  {index % 2 === 0 && <span className="hidden md:block w-8 h-px bg-primary-300"></span>}
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-5 text-sm md:text-base max-w-md mx-auto md:mx-0 ml-auto mr-auto">
                  {member.bio}
                </p>
                
                <div className={`flex gap-3 justify-center ${index % 2 === 1 ? 'md:justify-end' : 'md:justify-start'}`}>
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="p-2 bg-white rounded-full text-primary-900 hover:bg-primary-900 hover:text-white transition-colors shadow-sm border border-primary-100">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="p-2 bg-white rounded-full text-primary-900 hover:bg-primary-900 hover:text-white transition-colors shadow-sm border border-primary-100">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a href={member.socials.instagram} className="p-2 bg-white rounded-full text-primary-900 hover:bg-primary-900 hover:text-white transition-colors shadow-sm border border-primary-100">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 4.63c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {member.socials.email && (
                    <a href={member.socials.email} className="p-2 bg-white rounded-full text-primary-900 hover:bg-primary-900 hover:text-white transition-colors shadow-sm border border-primary-100">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
