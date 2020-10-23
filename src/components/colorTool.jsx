import { h } from 'preact'
import { useState } from 'preact/hooks'
import { TwitterPicker } from 'react-color'

import { colorToolMode } from '../constants'
import GradientPicker from './gradientPicker'

import CloseSVG from './../assets/001-cross-sign.svg'

const twitterPickerStyle = {
  default: {
    card: {
      backgroundColor: 'hsl(210,38%,15%)',
    },
    triangle: {
      borderColor: 'transparent transparent hsl(210,38%,15%)',
    },
  },
}

function ColorTool({
  onBGChange,
  isDark,
  onGradColorsChange,
  onGradientToggle,
  gradient,
  gradColors,
}) {
  const [colorTool, setColorTool] = useState(
    gradient ? colorToolMode.GRADIENT : colorToolMode.COLOR,
  )
  const [showTool, setShowTool] = useState(false)
  const [fillColor, setFillColor] = useState('#ff0080')

  const handleColorChange = (hex) => {
    setFillColor(hex)
    onBGChange(hex)
    setColorTool(colorToolMode.NONE)
  }

  const handleColorTool = (colorStatus) => {
    setColorTool(colorStatus)
    if (colorStatus === colorToolMode.GRADIENT) {
      onGradientToggle(true)
    } else {
      onGradientToggle(false)
    }
  }

  const handleToggleTool = (e, colorStatus) => {
    e.stopPropagation()
    handleColorTool(colorStatus)
    setShowTool(true)
  }

  const isGradient = colorTool === colorToolMode.GRADIENT

  return (
    <div className="relative flex items-center w-full justify-evenly">
      <div
        className="flex flex-col items-center justify-center w-1/2 p-3 rounded-lg cursor-pointer section"
        onClick={() => handleColorTool(colorToolMode.COLOR)}
        style={!isGradient && { background: '#edf2f7' }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-indigo-900 rounded-full shadow-lg color-btn">
          <div
            className="w-10 h-10 rounded-full shadow-md "
            onClick={(e) => handleToggleTool(e, colorToolMode.COLOR)}
            style={{ backgroundColor: fillColor }}
          ></div>
        </div>
        <div
          className="mt-3 font-semibold"
          style={isGradient && { color: '#718096' }}
        >
          Color
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center w-1/2 p-3 rounded-lg cursor-pointer section"
        onClick={() => handleColorTool(colorToolMode.GRADIENT)}
        style={isGradient && { background: '#edf2f7' }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-indigo-900 rounded-full shadow-lg color-btn">
          <div
            className="w-10 h-10 rounded-full shadow-md "
            onClick={(e) => handleToggleTool(e, colorToolMode.GRADIENT)}
            style={
              isGradient
                ? {
                    background: '#718096',
                    background: `linear-gradient(90deg, ${gradColors.colorOne} 0%, ${gradColors.colorTwo} 100%)`,
                  }
                : {
                    background: `linear-gradient(90deg, ${gradColors.colorOne} 0%, ${gradColors.colorTwo} 100%)`,
                  }
            }
          ></div>
        </div>
        <div
          className="mt-3 font-semibold"
          style={!isGradient && { color: '#718096' }}
        >
          Gradient
        </div>
      </div>
      {showTool && (
        <div className="absolute w-full color-tool">
          <button
            onClick={() => setShowTool(false)}
            className="absolute bottom-0 right-0 z-20 m-3 scale-in-center"
          >
            <img src={CloseSVG} alt="close svg" width="10" />
          </button>
          {colorTool === colorToolMode.COLOR && (
            <TwitterPicker
              color={fillColor}
              onChangeComplete={({ hex }) => handleColorChange(hex)}
              width="100%"
              z-index="20"
              styles={isDark ? twitterPickerStyle : {}}
              className="scale-in-center"
            />
          )}
          {colorTool === colorToolMode.GRADIENT && (
            <GradientPicker
              onGradColorsChange={onGradColorsChange}
              gradColors={gradColors}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ColorTool
