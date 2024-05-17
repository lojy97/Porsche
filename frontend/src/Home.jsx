import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css'; // Import the CSS module

function Home() {
  return (
    <div className={styles.container}> {/* Apply the container class */}
      <div className={styles.car1}> {/* Apply the car1 class */}
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/photos gt3/homepage_vid.mp4" type="video/mp4" />
        </video>
      </div>
      <p className={`${styles['fs-1']} ${styles['fw-bold']}`}>Models</p> {/* Apply fs-1 and fw-bold classes */}
      <div className={styles.carlos}> {/* Apply the carlos class */}
        <p className={styles.words}>Panamera</p> {/* Apply the words class */}
        <img src="/Images/porsche-panamera.png" alt="carpa" />
      </div>
      <div className={styles.carlo2}> {/* Apply the carlo2 class */}
        <p className={styles.words}>Taycan</p> {/* Apply the words class */}
        <img src="/Images/porsche-taycan.png" alt="cartay" />
      </div>
      <div className={styles.carlo3}> {/* Apply the carlo3 class */}
        <p className={styles.words}>911 carrera</p> {/* Apply the words class */}
        <img src="/Images/pic1.png" alt="Image 1" />
      </div>
      <div className={styles.carlo4}> {/* Apply the carlo4 class */}
        <p className={styles.words}>Gtsport Porsche 911 turbo s</p> {/* Apply the words class */}
        <img src="/Images/pic2.png" alt="Image 2" />
      </div>
    </div>
  );
}

export default Home;
