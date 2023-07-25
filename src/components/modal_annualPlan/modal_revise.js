import './modal_revise.css';
import { useState } from 'react';

export default function ModalRevise({ closeModal }) {
    
    return(
        <div className='modal-revise-container'>
            <div className='modal'>
                <div className='close_container' onClick={closeModal}>
                    <div className='close'>&times;</div>
                </div>
            </div>
        </div>
    )
}