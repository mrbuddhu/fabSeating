'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/Container'

const milestones = [
  {
    year: '2001',
    title: 'Our Humble Beginnings',
    description: 'Fabseating was founded with a vision to create high-quality, durable furniture in Chennai, India.',
    image: '/about/2001.jpg'
  },
  {
    year: '2005',
    title: 'First Major Project',
    description: 'Successfully completed our first large-scale commercial project, setting new standards in office furniture.',
    image: '/about/2005.jpg'
  },
  {
    year: '2010',
    title: 'Expansion Phase',
    description: 'Expanded our manufacturing facility to meet growing demand across South India.',
    image: '/about/2010.jpg'
  },
  {
    year: '2015',
    title: 'Hospitality Division Launch',
    description: 'Launched specialized solutions for the hospitality industry, working with leading hotel chains.',
    image: '/about/2015.jpg'
  },
  {
    year: '2020',
    title: 'Sustainable Practices',
    description: 'Implemented eco-friendly manufacturing processes and sustainable material sourcing.',
    image: '/about/2020.jpg'
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    description: 'Embraced technology to enhance customer experience and streamline our design process.',
    image: '/about/2024.jpg'
  }
]

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Update active index based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const newIndex = Math.min(
        milestones.length - 1,
        Math.floor(value * milestones.length)
      )
      setActiveIndex(newIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-primary-950 text-white">
        <Container>
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Story
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Two decades of crafting exceptional furniture and creating beautiful spaces across India.
            </motion.p>
          </div>
        </Container>
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={containerRef} className="relative py-20">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200" />
        
        <Container>
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0
            const isActive = index === activeIndex
            
            return (
              <div 
                key={index} 
                className={`relative mb-32 flex ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <motion.div 
                  className={`w-full md:w-5/12 p-6 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`p-8 bg-white rounded-lg shadow-lg ${isActive ? 'ring-2 ring-primary-500' : ''}`}>
                    <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-serif font-bold mb-4">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>

                {/* Center Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <motion.div 
                    className={`w-6 h-6 rounded-full ${isActive ? 'bg-primary-600 scale-125' : 'bg-primary-300'}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  />
                </div>

                {/* Image */}
                <motion.div 
                  className={`w-full md:w-5/12 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className={`overflow-hidden rounded-lg shadow-xl h-64 md:h-80 ${isActive ? 'ring-2 ring-primary-500' : ''}`}>
                    <img 
                      src={milestone.image} 
                      alt={milestone.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            )
          })}
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-primary-50">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              Passionate individuals dedicated to excellence in furniture craftsmanship.
            </p>
            
            {/* Team members grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                    {/* Team member image */}
                  </div>
                  <h3 className="text-xl font-bold">Team Member {i}</h3>
                  <p className="text-primary-600 mb-2">Position</p>
                  <p className="text-gray-600">Short bio or description goes here.</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
