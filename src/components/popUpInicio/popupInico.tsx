import { useState } from "react";
import "./popupInicio.css";

interface PopUpInicioProps {
    onClose: () => void;
}

const PopUpInicio: React.FC<PopUpInicioProps> = ({ onClose }) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    return (
        visible && (
            <div className="popupInicio">
                <div className="info">
                    <h2>Digital Solar System</h2>
                    <p>Move in real life to move through the galaxy</p>
                    <p>MORE INSTRUCTIONS</p>
                    <button onClick={handleClose}>GO</button>
                </div>
            </div>
        )
    );
};

export default PopUpInicio;