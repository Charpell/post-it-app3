import React from 'react';
import { Modal } from 'react-bootstrap';

/**
 * @description This component displays opens and closes a modal
 *
 * @param  {object} props store data passed to the component
 *
 * @method ModalButton
 *
 * @extends { DashboardNavigation }
 *
 * @return {ReactElement} markup
 */
const ModalButton = props => ({
  render() {
    return (
      <div>
        <li data-toggle="collapse" className="collapsed"
          onClick={props.action}>
          <a href="#" onClick={this.props.openModal}>
            <i className="fa fa-globe fa-lg"></i>&nbsp; {props.menuName}</a>
        </li>

        <Modal show={this.props.modalState} onHide={this.props.closeModal}>

          <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            <a href="#/dashboard" onClick={this.props.closeModal}> Close</a>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default ModalButton;
