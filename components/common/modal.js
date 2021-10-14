import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class CustomModal extends React.Component {
    constructor() {
        super()
        this.state = {show: false}
        window.modal = this
        console.log(window)
    }

    setShow(bool) {
        this.state[show] = bool
    }

    handleClose() {
        this.setShow(false)
    }

    handleOpen() {
        this.setShow(true)
    }

    render () {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}