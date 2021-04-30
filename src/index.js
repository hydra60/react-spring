import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import { useTransition, animated, interpolate } from 'react-spring'
import data from './data'
import { cloneDeep } from 'lodash'
import './styles.css'

function App() {
  const originalData = cloneDeep(data)
  const [rows, set] = useState(data)

  useEffect(
    () =>
      void setInterval(() => {
        set(rotateItems(rows))
      }, 500),
    []
  )

  const rotateItems = (list) => {
    list.unshift(list.pop())
    return setPosition(list)
  }

  const setPosition = (list) => {
    return list.map((item, index) => {
      item.x = originalData[index].x
      item.y = originalData[index].y
      return item
    })
  }

  const transitions = useTransition(
    rows.map((data) => ({ ...data })),
    (d) => d.name,
    {
      enter: ({ x, y }) => ({ x, y }),
      update: ({ x, y }) => ({ x, y })
    }
  )

  return (
    <div>
      <div style={{ paddingBottom: 60 }}>
        <h1>react-spring useTransition Demo</h1>
        <a
          target="_blank"
          href="https://medium.com/the-clever-dev/understanding-react-spring-usetransition-38526328da98">
          Click here for an intro to react-spring
        </a>
      </div>
      <div className="list">
        {transitions.map(({ item, props: { x, y }, key }) => {
          return (
            <animated.div
              key={key}
              className="cell"
              style={{
                transform: interpolate([x, y], (x, y) => `translate(${x}px, ${y}px)`),
                background: item.css
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
