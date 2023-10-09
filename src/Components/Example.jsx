import React, { Component } from "react";
import Carousel from "./Carousel"
import {v4 as uuid} from "uuid"; 
import { config } from "react-spring";
import { Hero } from "./Hero";
import ProjectCard from "./ProjectCard";



export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 1,
    showNavigation: false,
    config: config.gentle
  };

  slides = [
    {
      key: uuid(),
      content: <Hero alt= "1" style={{ aspectRatio: '4 / 3' }}/>
    },
    {
      key: uuid(),
      content: <img src="https://picsum.photos/800/802/?random" alt="2"  style={{ aspectRatio: '4 / 3' }} />
    },
    {
      key: uuid(),
      content: <img src="https://picsum.photos/600/803/?random" alt="3" style={{ aspectRatio: '4 / 3' }}/>
    },
    {
      key: uuid(),
      content: <img src="https://picsum.photos/800/500/?random" alt="4" style={{ aspectRatio: '4 / 3' }} />
    },
    {
      key: uuid(),
      content: <img src="https://picsum.photos/800/804/?random" alt="5" style={{ aspectRatio: '4 / 3' }}/>
    },
    {
      key: uuid(),
      content: <img src="https://picsum.photos/500/800/?random" alt="6" style={{ aspectRatio: '4 / 3' }}/>
    },
    {
      key: uuid(),
      content: <img src="https://picsum.photos/800/600/?random" alt="7" />
    },
    {
      key: uuid(),
      content: <img src="https://picsum.photos/805/800/?random" alt="8" />
    }
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index  }) };
  });

  onChangeInput = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  handleProjectClick = (index) => {
    this.setState({ goToSlide: index });
    console.log(index);
  };
  handleDirectSlideChange(targetIndex) {
    // Set the goToSlide state directly without any intermediate transitions
    this.setState({
      index: targetIndex,
      goToSlide: targetIndex,
      newSlide: false,
    });
  }


  render() {
    return (
      <div className=" " style={{ width: "100%", height: "700px", margin: "0 auto" }}>
        <Carousel
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />

          <div className="max-width-[70%] mb-5 m-auto flex justify-around pb-5" >
            {this.slides.map((slide, index) => (
              <ProjectCard
                key={slide.key}
                goToSlide={index}
                thumbnailUrl={`https://picsum.photos/200/200/?random&${index}`}
                selected={index === this.state.goToSlide}
                onClick={() => {
                  const currentIndex = this.state.index;
                  const targetIndex = index;
    
                  // Calculate the difference in slide indices
                  const indexDifference = Math.abs(targetIndex - currentIndex);
    
                  if (indexDifference > 1) {
                    // If the difference is more than 1, use direct slide change
                    this.handleDirectSlideChange(targetIndex);
                  } else {
                    // Otherwise, use the regular transition
                    this.handleProjectClick(index);
                  }
                }}
              />
            ))}
          </div>
      </div>
    );
  }
}
