import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './About.module.css'; // Import the CSS module

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={`${styles.fs1} ${styles.fwBold} ${styles.animatedText}`}>About us</p>
        <div className={`${styles.textBox} ${styles.textContainer}`}>
          <p className={`${styles.fwNormal} ${styles.animatedText}`}>
            Welcome to the dynamic universe of Porsche, where innovation meets adrenaline
            and every drive tells a captivating tale. Our journey is one fueled by a relentless pursuit of excellence, where
            each model embodies the spirit of performance and the thrill of the open road.
          </p>
          <p className={`${styles.fwNormal} ${styles.animatedText}`}>
            In our world, legends aren't just born they're forged. Take for instance, the remarkable Sally, the spirited
            embodiment of Porsche, a vibrant character from the legendary Disney-Pixar movie franchise "Cars" Sally is an
            embodiment of our brand's essence, a fusion of elegance, sophistication, and a passion for the road less
            traveled. Just like Sally, our cars are symbols of freedom, adventure, and the pursuit of dreams.
            At Porsche, we're not just makers of exceptional automobiles, we're creators of experiences. Did you know that
            Porsche has a storied history that dates back to 1931? Founded by Ferdinand Porsche, our company has been at the
            forefront of automotive engineering, pioneering groundbreaking technologies, and redefining what it means to
            drive.
          </p>
          <p className={`${styles.fwNormal} ${styles.animatedText}`}>
            From the iconic Porsche 911 to the commanding presence of the Cayenne, each model is a testament to our
            unwavering commitment to craftsmanship and performance. Our dedication to innovation has earned us numerous
            accolades, including countless victories on the racetrack and prestigious awards for design and engineering
            excellence.
            But our story doesn't end with our cars it begins with our community, a diverse tapestry of enthusiasts,
            visionaries, and dreamers united by a shared love for driving. Here, connections are forged, friendships are
            made, and memories are created that last a lifetime.
            So, whether you're a seasoned aficionado or a curious explorer, we invite you to join us on this exhilarating
            journey. Discover the legacy, embrace the passion, and experience the thrill of Porsche like never before.
            Welcome to a world where every drive is an adventure and every journey is a story waiting to be told. Welcome to
            Porsche.
          </p>
          <div className={styles.overlay}></div>
        </div>
      </div>
    </div>
  );
}

export default About;
