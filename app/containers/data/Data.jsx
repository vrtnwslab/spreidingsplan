import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from 'actions'
import Layout from 'components/layout/layout'

let datafile = null

// uncomment for local data
// datafile = require("data/data.json");

class Data extends Component {
  constructor (props) {
    super(props)
    this.handleSetCountry = this.handleSetCountry.bind(this)
  }

  componentWillMount () {
    const {
            settings,
            dispatch
        } = this.props

    if (datafile) {
      dispatch(actions.fetchFile(datafile))
    } else {
      if (settings.realtime) {
        dispatch(actions.fetchRealtime(settings.projectName))
      } else {
        dispatch(actions.fetchOnce(settings.projectName))
      }
    }
  }

  handleSetCountry (code) {
    const {
      dispatch
    } = this.props

    dispatch(actions.setCountry(code))
  }

  render () {
    const {
      settings,
      data
    } = this.props

    if (!settings.fetched) {
      return <div className='loading' />
    }

    return (
      <Layout
        data={data}
        activeCountry={settings.active}
        onSetCountry={this.handleSetCountry}
      />
    )
  }
}

const mapStateToProps = (store) => ({
  'data': store.data,
  'settings': store.settings
})

export default connect(mapStateToProps)(Data)
