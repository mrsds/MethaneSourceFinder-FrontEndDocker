import React from "react";
import PropTypes from "prop-types";
import MiscUtil from "_core/utils/MiscUtil";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Chip from "@material-ui/core/Chip";
//import styles from "components/Reusables/ChipDropdownStyles.scss";
import styles from "components/Reusables/ChipDropdownStylesHiContrast.scss"; // Can this just append ChipDropdownStyles.scss where needed? duplication of remainder

const ChipDropdown = props => {
    let rootClasses = MiscUtil.generateStringFromSet({
        [styles.active]: props.active,
        [styles.primary]: props.value ? true : false,
        [props.className]: props.className ? true : false
    });
    return (
        <Chip
            classes={{
                root: rootClasses,
                label: styles.label,
                deleteIcon: styles.deleteIcon
            }}
            onClick={() => props.onClick()}
            onDelete={props.value ? () => props.onDelete() : null}
            label={
                <React.Fragment>
                    {props.value || props.label}
                    {!props.value ? <ArrowDropDownIcon className={styles.arrowIcon} /> : ""}
                </React.Fragment>
            }
        />
    );
};

ChipDropdown.propTypes = {
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string
};
export default ChipDropdown;
