import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default (props) => {
  const [ref, slider] = useKeenSlider<HTMLDivElement>({ loop: true });

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={ref} className="keen-slider">
          <div className="keen-slider__slide number-slide1">1</div>
          <div className="keen-slider__slide number-slide2">2</div>
          <div className="keen-slider__slide number-slide3">3</div>
          <div className="keen-slider__slide number-slide4">4</div>
          <div className="keen-slider__slide number-slide5">5</div>
          <div className="keen-slider__slide number-slide6">6</div>
        </div>
        {slider && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || slider.prev()}
            />
            <ArrowRight
              onClick={(e) => e.stopPropagation() || slider.next()}
            />
          </>
        )}
      </div>
    </>
  )
}

function ArrowLeft(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--left" + disabeld}
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  )
}

function ArrowRight(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--right" + disabeld}
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  )
}

