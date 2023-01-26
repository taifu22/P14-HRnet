import React, { useState } from 'react';

function Modal() {
    const [isShowing, setIsShowing] = useState();
    function toggle() {
        setIsShowing(!isShowing);
    }
    return {
        isShowing,
        toggle
    };
}

export default Modal;