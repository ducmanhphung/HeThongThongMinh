import HeaderSlideItem from "@components/HeaderSlideItem/HeaderSlideItem";
import styles from "./styles.module.scss";
import Carousel from "react-bootstrap/Carousel";

import slideImage from "src/assets/images/800-300-gIF-800x300.gif";

function HeaderSlide() {
  return (
    <div className={styles.headerSlideWrapper}>
      <Carousel>
        <Carousel.Item>
          <HeaderSlideItem imageSrc={slideImage} />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <HeaderSlideItem />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <HeaderSlideItem />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeaderSlide;
