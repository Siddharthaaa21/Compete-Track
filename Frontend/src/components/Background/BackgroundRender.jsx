import React from 'react'
import Starfield from '../Background-stars/Starfield.jsx'
// import styles from '/../styles'
import {styles} from '../../styles.js'
import { motion } from 'framer-motion'
import Contest from '../Contest/Contest.jsx'
function Hero() {
//   return (
//     // <section className='relative w-full h-screen mx-auto'>

return(

          <section className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-8`}>
    <Starfield />
  </section>

  )
}

export default Hero
