import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "./Button";
import PropTypes from "prop-types";

export const Toggleable = forwardRef(
  ({ toggleLabel, toggleLabelClose, testId, children }, ref) => {
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
          <Button testId={testId} label={toggleLabel} onClick={onOpen} />
        </div>
        <div style={hideContent}>
          {children}
          {toggleLabelClose && (
            <Button
              testId={String(toggleLabelClose).toLowerCase()}
              label={toggleLabelClose}
              onClick={onOpen}
            />
          )}
        </div>
      </div>
    );
  }
);

Toggleable.propTypes = {
  toggleLabel: PropTypes.string.isRequired,
  toggleLabelClose: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
