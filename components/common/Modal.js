import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class CustomModal extends React.Component {
    constructor() {
        super()
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
            <Modal show={this.state.show} onHide={this.hide}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you&apos;re reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.hide}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.hide}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}