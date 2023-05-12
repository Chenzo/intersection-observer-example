"use client"; // this is a client component 👈🏽
import styles from './page.module.css'
import React, { useRef, useEffect } from "react";



const handleUnderline = function (entries) {

  let highlighted = "";
  let highlightedRatio = 0;
  console.log("-------------------")
  entries.forEach((entry) => {
    let id = entry.target.id;
    console.log(id, entry.intersectionRatio, entry.isIntersecting);
    //scrolling oddly between two sections can bork this... - vince 06.14.2022
    //might need a timeout after a certain amount of time to iterate over each thing and check
    //console.log(id, entry.intersectionRatio, entry.isIntersecting);
    if (entry.isIntersecting) {
      //if (entry.intersectionRatio > 0) {
      //document.querySelector(`#${id}`).classList.add(styles.highlight);
      console.log(entry.intersectionRatio +">"+ highlightedRatio)
      console.log(entry.intersectionRatio > highlightedRatio)
      if (entry.intersectionRatio > highlightedRatio) {
        console.log("intersecting - " + id)
        highlighted = id;
        highlightedRatio = entry.intersectionRatio;
      }
    } else {
      console.log("not intersecting - " + id);
      document.querySelector(`#${id}`).classList.remove(styles.highlight);
    }
  });


  //select each element with the class of highlight and remove it
  /* document.querySelectorAll(`.${styles.highlight}`).forEach((el) => {
    el.classList.remove(styles.highlight);
  }); */

  if (highlighted != "") {
  console.log("highlighted: " + highlighted);
  document.querySelector(`#${highlighted}`).classList.add(styles.highlight);
  }
};
export default function Home() {

  useEffect(() => {
    let underlineObserver = new IntersectionObserver(handleUnderline, {rootMargin: '-5% 0px -90%'},{threshold: [0, 0.51]});
                                                                        //margins are 100% with a little fugding for top and bottom

    underlineObserver.observe( document.querySelector("#section1"));
    underlineObserver.observe( document.querySelector("#section2"));
    underlineObserver.observe( document.querySelector("#section3"));
    underlineObserver.observe( document.querySelector("#section4"));

    return () => {
      underlineObserver.disconnect();
    };
  }, []);



  return (
    <main className={styles.main}>
      
      <div className={styles.aSection} id="section1">
        <h1>Section One</h1>
      </div>

      <div className={styles.aSection} id="section2">
        <h1>Section Two</h1>
      </div>

      <div className={styles.aSection} id="section3">
        <h1>Section Three</h1>
      </div>

      <div className={styles.aSection} id="section4">
        <h1>Section Four</h1>
      </div>

    </main>
  )
}
