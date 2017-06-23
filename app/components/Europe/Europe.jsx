import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as topojson from 'topojson-client'
import eu from './EU.json'
import SvgContainer from 'components/SvgContainer/SvgContainer'

const d3 = require('d3')

class Europe extends Component {
  render () {
    const {
        scale,
        width,
        height,
        center
    } = this.props.map.eu
    const {
      data
    } = this.props
    const {
      onSetCountry
    } = this.props
    const projection = d3
      .geoMercator()
      .scale(scale)
      .translate([width / 2, height / 2])
      .center(center)
    const path = d3
      .geoPath()
      .projection(
          projection
      )
    const regions = topojson
      .feature(
          eu,
          eu
          .objects
          .europe
      )
      .features
    const color = d3
      .scaleThreshold()
      .domain([0, 10, 20, 30, 40, 50, 60])
      .range(
      [
        d3.color('#7FC242').darker(7),
        d3.color('#7FC242').darker(6),
        d3.color('#7FC242').darker(5),
        d3.color('#7FC242').darker(4),
        d3.color('#7FC242').darker(3),
        d3.color('#7FC242').darker(2),
        d3.color('#7FC242').darker(1),
        '#7FC242'
      ]
      )

    return (
      <div>
        <div>
          <SvgContainer
            width={width}
            height={height}
          >
            {
              regions.map((e, i) => {
                const code = e.properties.iso_a3
                const isListed = data[code]
                if (!isListed) {
                  return (
                    <path
                      key={e.properties.name}
                      d={path(e)}
                      stroke={'#ccc'}
                      fill={'#1B2935'}
                      strokeWidth={0.1}
                    />
                  )
                } else {
                  const refugees = isListed.italy + isListed.greece
                  const proc = Math.round(refugees / isListed.commitment * 10000) / 100
                  if (process.env.NODE_ENV === `development`) {
                    console.log(proc)
                  }
                  return (
                    <path
                      pointerEvents={'all'}
                      key={e.properties.name}
                      d={path(e)}
                      stroke={'#000'}
                      fill={color(proc)}
                      strokeWidth={0.5}
                      onClick={() => onSetCountry(e.properties.iso_a3)}
                    />
                  )
                }
              })
            }
          </SvgContainer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  'map': store.map
})

export default connect(mapStateToProps)(Europe)
