import React from 'react';

function ModalSuccess(props) {
    return (
          <div id='modal' className="modal">
              <div className='modal-content'>
                  <button onClick={() => props.hide()} href="#demo" class="modal-close">
                    &times;
                  </button>
                  <p>Employee has been added</p>
              </div>
          </div>
    );
}

export default ModalSuccess;