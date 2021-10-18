import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class CustomModal extends React.Component {
    constructor( {props} ) {
        super( {props} )
        this.state = {show: false}
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }

    componentDidMount() {
        window.modal = this
    }

    setShow(bool) {
        this.setState({
            show: bool
        })
    }

    show() {
        this.setShow(true)
    }

    hide() {
        this.setShow(false)
    }

    render () {
        return (
            <Modal show={this.state.show} centered>
                <Modal.Header>
                <Modal.Title>Colourguesser</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="primary" onClick={() => {this.props.onStartClickedHandler(); this.hide()}}>
                    Start
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}