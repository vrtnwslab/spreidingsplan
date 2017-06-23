import React, { Component } from 'react'
import Europe from 'components/Europe/Europe'
require('font-awesome-sass-loader')
const d3 = require('d3')

export default class Layout extends Component {
  render () {
    const {
      data,
      activeCountry,
      onSetCountry
    } = this.props
    const country = data[activeCountry] ? data[activeCountry].country : false
    const refugees = country ? data[activeCountry].italy + data[activeCountry].greece : false
    const commit = country ? data[activeCountry].commitment : false
    const proc = country ? Math.round(refugees / commit * 1000) / 10 : false
    return (
      <div className='app__wrapper'>
        <div id='app__main'>
          <h2 className='header__title'>{'Spreidingsplan vluchtelingen in kaart'}</h2>
          {
            activeCountry === 0 &&
            <div className='fiche'>
              <h2>{'Europa'}</h2>
              <p className='details'><small>Klik op de kaart voor details per land</small></p>
              <hr />
              <p>{`Aantal opgevangen vluchtelingen`}</p>
              <h4>{`${Number(6896 + 13927).toLocaleString('nl')}`}</h4>
              <p>{'Opgelegd volgens verdeelsleutel'}</p>
              <h4>{'98.255'}</h4>
              <hr />
              <div className='procent'><p>Opdracht volbracht voor</p><h1>{'21%'}</h1></div>
            </div>
          }
          {
            activeCountry !== 0 &&
            <div className='fiche'>
              <p className='close' onClick={() => onSetCountry(0)}>{'x'}</p>
              <h2>{country}</h2>
              <hr />
              <p>{`Aantal opgevangen vluchtelingen`}</p>
              <h4>{`${Number(refugees).toLocaleString('nl')}`}</h4>
              <p>{`Opgelegd volgens verdeelsleutel`}</p>
              <h4>{`${Number(commit).toLocaleString('nl')}`}</h4>
              <hr />
              {
                commit !== 0 &&
                <div className='procent'><p>Opdracht volbracht voor </p><h1>{`${proc.toLocaleString('nl')}%`}</h1></div>
              }
            </div>
          }
          <div className='legende'>
            <div className='blokWrap'>
              <p>{'0'}</p>
              <div
                className='blok'
                style={{
                  backgroundColor: d3.color('#7FC242').darker(6),
                  height: '10px'
                }}
                  />
            </div>
            <div className='blokWrap'>
              <p>{'10'}</p>
              <div
                className='blok'
                style={{
                  backgroundColor: d3.color('#7FC242').darker(5),
                  height: '10px'
                }}
                  />
            </div>
            <div className='blokWrap'>
              <p>{'20'}</p>
              <div
                className='blok'
                style={{
                  backgroundColor: d3.color('#7FC242').darker(4),
                  height: '10px'
                }}
                  />
            </div>
            <div className='blokWrap'>
              <p>{'30'}</p>
              <div
                className='blok'
                style={{
                  backgroundColor: d3.color('#7FC242').darker(3),
                  height: '10px'
                }}
                  />
            </div>
            <div className='blokWrap'>
              <p>{'40'}</p>
              <div
                className='blok'
                style={{
                  backgroundColor: d3.color('#7FC242').darker(2),
                  height: '10px'
                }}
                  />
            </div>
            <div className='blokWrap'>
              <p>{'50'}</p>
              <div
                className='blok'
                style={{
                  backgroundColor: d3.color('#7FC242').darker(1),
                  height: '10px'
                }}
                  />
            </div>
            <div className='blokWrap'>
              <p>{'> 60%'}</p>
              <div
                className='blok'
                style={{
                  backgroundColor: '#7FC242',
                  height: '10px'
                }}
                  />
            </div>
          </div>
          <div className='map'>
            <Europe
              data={data}
              onSetCountry={onSetCountry}
            />
          </div>
        </div>
      </div>
    )
  }
}
