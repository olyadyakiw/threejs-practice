import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'

const InfoBox = ({ text, link, btnText }) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
            {text}
        </p>
        <Link className='neo-brutalism-white neo-btn' to={link}>
            {btnText}
            <img className='w-4 h-4 object-contain' src={arrow} />
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi! I am <span className='font-semibold'>Olha</span> 👋
            <br />
            A Software Engineer from Ukraine
        </h1>
    ),
    2: (
        <InfoBox text="Worked with many companies and picked up many skills along the way" link="/about" btnText="learn more" />
    ),
    3: (
        <InfoBox text="Worked with many companies and picked up many skills along the way" link="/projects" btnText="Visit my portfolio" />
    ),
    4: (
        <InfoBox text="Do you want contact me?" link="/contact" btnText="Let's talk!" />
    ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo