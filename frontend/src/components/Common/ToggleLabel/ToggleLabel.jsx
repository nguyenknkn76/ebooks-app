import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./ToggleLabel";

const ToggleLabel = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <div style={{ display: visible ? "none" : "" }} className={styles["toggle-button"]}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={{ display: visible ? "" : "none" }} className={styles["toggle-content"]}>
                <div className={styles["arrow-back"]} onClick={toggleVisibility}>
                    &#8592;
                </div>
                {props.children}
            </div>
        </div>
    );
});

export default ToggleLabel;
