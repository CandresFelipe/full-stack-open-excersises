import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "./Button";

export const Toggleable = forwardRef(
  ({ toggleLabel, toggleLabelClose, children }, ref) => {
    const [openToggle, setOpenToggle] = useState(false);
    const hideCreateButton = { display: openToggle ? "none" : "" };
    const hideContent = { display: openToggle ? "" : "none" };

    const onOpen = () => {
      setOpenToggle(!openToggle);
    };

    useImperativeHandle(
      ref,
      () => ({
        open: openToggle,
      }),
      []
    );

    return (
      <div>
        <div style={hideCreateButton}>
          <Button label={toggleLabel} onClick={onOpen} />
        </div>
        <div style={hideContent}>
          {children}
          {toggleLabelClose && (
            <Button label={toggleLabelClose} onClick={onOpen} />
          )}
        </div>
      </div>
    );
  }
);
