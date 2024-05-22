import {ReactNode} from 'react';
import classNames from "classnames";

interface props {
    onRemovePicture: () => void
    children: ReactNode
    className?: string
    disabled?: boolean
}

const ImageActionsContainer = ({children, onRemovePicture, disabled = false, className = ""}: props) => {
    const containerClasses = classNames({
        "relative": true,
        [className]: true
    });

    return (
        <div className={containerClasses}>
            <button
                disabled={disabled}
                type="button"
                className="absolute top-5 right-5 bg-red-500 p-5 rounded-full text-white w-10 h-10 flex items-center justify-center"
                onClick={onRemovePicture}>
                <i className="fi fi-tr-trash-xmark"></i>
            </button>
            {children}
        </div>
    );
};

export default ImageActionsContainer;
