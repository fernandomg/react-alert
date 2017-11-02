import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert'
import Message from './Message'
import Icon, {IconPlaceholder} from './Icon'
import Close from './Close'

class AlertMessage extends Component {
  static defaultProps = {
    id: '',
    icon: null,
    message: '',
    type: 'info',
    theme: 'dark',
    themeColors: {},
    time: 0,
    onRemoveAlert: () => {}
  }

  static propTypes = {
    id: PropTypes.string,
    icon: PropTypes.element,
    message: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    type: PropTypes.oneOf(['info', 'success', 'error']),
    theme: PropTypes.oneOf(['dark', 'light', 'personalized']),
    themeColors: ProtoTypes.object,
    time: PropTypes.number,
    onRemoveAlert: PropTypes.func
  }

  _removeItself = () => {
    const {onRemoveAlert, id} = this.props
    onRemoveAlert(id)
  }

  componentDidMount () {
    const {time} = this.props

    if (time > 0) {
      setTimeout(() => {
        this._removeItself()
      }, time)
    }
  }

  render () {
    const {message, theme, themeColors, icon, type} = this.props
    let backgroundColor = '#333'
    let closeBackground = '#444'
    let color = '#fff'

    if (theme === 'light') {
      backgroundColor = '#fff'
      closeBackground = '#f3f3f3'
      color = '#333'
    } else {
      backgroundColor = themeColors.backgroundColor
      closeBackground = themeColors.closeBackground
      color = themeColors.color
    }

    return (
      <Alert glam={{backgroundColor, closeBackground, color}}>
        <IconPlaceholder>
          {icon || <Icon glam={{type}} />}
        </IconPlaceholder>
        <Message>
          {message}
        </Message>
        <Close
          glam={{backgroundColor, closeBackground, color}}
          onClick={this._removeItself}
        />
      </Alert>
    )
  }
}

export default AlertMessage
