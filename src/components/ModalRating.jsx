import React,{useState, useRef} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


export default function ModalRating(props) {

    const [rating, setRating] = useState()
    return (
        <div>
            <Modal isOpen={props.propsBoolModal}>
                <ModalHeader>Berikan Rating Anda</ModalHeader>
                <ModalBody>
                    Masukan Rating 0-5:
                    <input
                        className="form-control"
                        type="text"
                        onChange={(e) => {
                            setRating(e.target.value) 
                        }}
                        placeholder="0-5"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button outline color="warning" onClick={props.propsCancel}>
                        Cancel
                    </Button>
                    <Button outline color="success" onClick={() => {props.propsSave(props.propsId, rating)}} >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
     
     
        </div>
    )
}
