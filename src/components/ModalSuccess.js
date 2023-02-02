import React from 'react';

function ModalSuccess(props) {
    return (
          <div id='modal' className="modals">
              <div className='modals-content'>
                  <button onClick={() => props.hide()} href="#demo" class="modals-close">
                    &times;
                  </button>
                  <p>Employee has been added</p>
              </div>
          </div>
    );
}

export default ModalSuccess;