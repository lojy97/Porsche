import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './Home.module.css'; // Import the CSS module


function Home() {
  return (
    <div className={styles.container}> {/* Apply the container class */}
      <div className={styles.modelsContainer}> {/* New: Apply the modelsContainer class */}
        <p className={styles.modelsText}>Models</p> {/* New: Apply the modelsText class */}
      </div>
      <div className={styles.car1}> {/* Apply the car1 class */}
        <video autoPlay loop muted playsInline className={styles.car1Video}>
          <source src="/photos gt3/homepage_vid.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.carlos}> {/* Apply the carlos class */}
        <img src="/Images/porsche-panamera.png" alt="carpa" className={styles.carImage} />
        <p className={styles.words}><i className="bi bi-car-front"></i> Panamera</p> {/* Apply the words class and add icon */}
      </div>
      <div className={styles.carlo2}> {/* Apply the carlo2 class */}
        <img src="/Images/porsche-taycan.png" alt="cartay" className={styles.carImage} />
        <p className={styles.words}><i className="bi bi-lightning-charge"></i> Taycan</p> {/* Apply the words class and add icon */}
      </div>
      <div className={styles.carlo3}> {/* Apply the carlo3 class */}
        <img src="/Images/pic1.png" alt="Image 1" className={styles.carImage} />
        <p className={styles.words}><i className="bi bi-car-front-fill"></i> 911 Carrera</p> {/* Apply the words class and add icon */}
      </div>
      <div className={styles.carlo4}> {/* Apply the carlo4 class */}
        <img src="/Images/pic2.png" alt="Image 2" className={styles.carImage} />
        <p className={styles.words}><i className="bi bi-speedometer"></i> Gtsport Porsche 911 Turbo S</p> {/* Apply the words class and add icon */}
      </div>
    </div>
  );
}


export default Home;
