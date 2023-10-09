import React, { Component } from "react";
import styled from "@emotion/styled";
import Slide from "./Slide";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;


const DEFAULT_GO_TO_SLIDE_DELAY = 200;

function mod(a, b) {
  return ((a % b) + b) % b;
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      goToSlide: 0,
      prevPropsGoToSlide: 0,
      newSlide: false,
    };
    this.goToIn = 0;
  }

  static defaultProps = {
    offsetRadius: 2,
    animationConfig: { tension: 120, friction: 14 },
    goToSlideDelay: DEFAULT_GO_TO_SLIDE_DELAY,
  };

  static getDerivedStateFromProps(props, state) {
    const { goToSlide } = props;

    if (goToSlide !== state.prevPropsGoToSlide) {
      return { prevPropsGoToSlide: goToSlide, goToSlide, newSlide: true };
    }

    return null;
  }

  componentDidUpdate() {
    const { goToSlideDelay } = this.props;
    const { index, goToSlide, newSlide } = this.state;
    if (typeof goToSlide === "number") {
      if (newSlide) {
        this.handleGoToSlide();
      } else if (index !== goToSlide && window) {
        window.clearTimeout(this.goToIn);
        this.goToIn = window.setTimeout(this.handleGoToSlide, goToSlideDelay);
      } else if (window) {
        window.clearTimeout(this.goToIn);
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.clearTimeout(this.goToIn);
    }
  }

  modBySlidesLength(index) {
    return mod(index, this.props.slides.length);
  }

  moveSlide(direction) {
    this.setState({
      index: this.modBySlidesLength(this.state.index + direction),
      goToSlide: null,
    });
  }

  getShortestDirection(from, to) {
    if (from > to) {
      if (from - to > this.props.slides.length - 1 - from + to) {
        return 1;
      } else return -1;
    } else if (to > from) {
      if (to - from > from + this.props.slides.length - 1 - to) {
        return -1;
      } else return 1;
    }
    return 0;
  }

  

  handleGoToSlide() {
    if (typeof this.state.goToSlide !== "number" && this.state.goToSlide !== null) {
        return;
      }
    if(Math.abs(this.state.goToSlide - this.state.index) > 1) {
        this.setState({
            index: this.state.goToSlide,
            goToSlide: null
            
        })
        return
    }
    const { index } = this.state;

    const goToSlide = mod(this.state.goToSlide, this.props.slides.length);

    if (goToSlide !== index) {
      let direction = this.getShortestDirection(index, goToSlide);
      const isFinished =
        this.modBySlidesLength(index + direction) === goToSlide;

      this.setState({
        index: this.modBySlidesLength(index + direction),
        newSlide: isFinished,
        goToSlide: isFinished ? null : goToSlide,
      });
    }
  }

  clampOffsetRadius(offsetRadius) {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides() {
    const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[this.modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  }

  render() {
    const { animationConfig, offsetRadius, showNavigation, offsetFn } = this.props;

    return (
      <React.Fragment>
        <Wrapper>
          {this.getPresentableSlides().map(
            (slide, presentableIndex) => (
              <Slide
                key={slide.key}
                content={slide.content}
                onClick={slide.onClick}
                offsetRadius={this.clampOffsetRadius(offsetRadius)}
                index={presentableIndex}
                animationConfig={animationConfig}
                offsetFn={offsetFn}
              />
            )
          )}
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Carousel;