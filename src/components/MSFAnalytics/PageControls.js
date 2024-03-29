import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";

import { IconButtonSmall } from "_core/components/Reusables";
import styles from "components/MSFAnalytics/PageControlsStyles.scss";

export const PageControls = props => {
    if (props.resultCount === 0) {
        return <div />;
    }

    const startIndex = props.currentPageIndex + 1;
    const moreResults = startIndex + props.resultsPerPage <= props.resultCount;
    const endIndex = moreResults
        ? props.currentPageIndex + props.resultsPerPage
        : props.resultCount;
    const counterLabel =
        props.resultCount !== 0
            ? `${startIndex} – ${endIndex} of ${props.resultCount} results`
            : "No sources found";

    return (
        <React.Fragment>
            <Divider />
            <div className={styles.root}>
                <div className={styles.rightSide}>
                    <Typography variant="caption" className={styles.label}>
                        {counterLabel}
                    </Typography>
                    <div className={styles.buttons}>
                        <IconButtonSmall
                            key="chevronLeft"
                            onClick={() =>
                                props.onPageBackward(props.currentPageIndex - props.resultsPerPage)
                            }
                            disabled={props.currentPageIndex === 0}
                            aria-label={
                                "Previous set of results" +
                                (props.currentPageIndex === 0 ? " (disabled)" : "")
                            }
                        >
                            <ChevronLeftIcon />
                        </IconButtonSmall>
                        <IconButtonSmall
                            key="chevronRight"
                            onClick={() =>
                                props.onPageForward(props.currentPageIndex + props.resultsPerPage)
                            }
                            disabled={!moreResults}
                            aria-label={"Next set of results" + (!moreResults ? " (disabled)" : "")}
                        >
                            <ChevronRightIcon />
                        </IconButtonSmall>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

PageControls.propTypes = {
    resultCount: PropTypes.number,
    currentPageIndex: PropTypes.number,
    onPageBackward: PropTypes.func,
    onPageForward: PropTypes.func,
    resultsPerPage: PropTypes.number
};

export default PageControls;
