import React from "react"
import "./about.css"
import Back from "../common/back/Back"
import AboutCard from "./AboutCard"

const About = () => {
  return (
     <div id="top">
      <Back title='À propos de nous' />
      <AboutCard />
      </div>
  )
}

export default About
