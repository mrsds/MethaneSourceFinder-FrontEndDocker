/**
 * Copyright 2017 California Institute of Technology.
 *
 * This source code is licensed under the APACHE 2.0 license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Immutable from "immutable";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HttpIcon from "@material-ui/icons/Http";
import HdrStrongIcon from "@material-ui/icons/HdrStrong";
import Typography from "@material-ui/core/Typography";
import { LoadingSpinner } from "_core/components/Reusables";
import { AsyncImage } from "_core/components/AsyncImage";
import * as appActions from "_core/actions/appActions";
import MiscUtil from "_core/utils/MiscUtil";
import styles from "_core/components/LayerInfo/LayerInfoContainer.scss";

const defaultData = Immutable.Map({
    title: "Title Unknown",
    platform: "Platform Unknown",
    spatialResolution: "Spatial Resolution Unknown",
    dateRange: "Date Range Unknown",
    description: "Description Unknown"
});

export class LayerInfoContainer_Extended extends Component {
    render() {
        let metadata = defaultData.merge(this.props.metadata.get("content"));

        let loadingClasses = MiscUtil.generateStringFromSet({
            [styles.layerInfoLoading]: true,
            [styles.active]: this.props.layerMetadataAsync.get("loading")
        });

        let errorClasses = MiscUtil.generateStringFromSet({
            [styles.layerInfoError]: true,
            [styles.active]:
                !this.props.metadata.get("content") &&
                !this.props.layerMetadataAsync.get("loading") &&
                this.props.layerMetadataAsync.get("failed")
        });

        let contentClasses = MiscUtil.generateStringFromSet({
            [styles.root]: true,
            [this.props.className]: typeof this.props.className !== "undefined"
        });

        return (
            <Dialog
                classes={{ paper: styles.paper }}
                open={this.props.isOpen}
                onClose={this.props.appActions.closeLayerInfo}
            >
                <DialogContent className={contentClasses}>
                    <AsyncImage
                        className={styles.thumbnailImage}
                        src={this.props.thumbnailUrl}
                        alt={this.props.thumbnailAltText}
                    />
                    <div className={styles.layerInfoContent}>
                        <div className={loadingClasses}>
                            <LoadingSpinner className={styles.layerInfoSpinner} />
                        </div>
                        <div className={errorClasses}>
                            <div className={styles.errorContent}>
                                <ErrorOutlineIcon />
                                <Typography variant="subheading" color="default">
                                    No Metadata Available
                                </Typography>
                            </div>
                        </div>
                        <Typography variant="headline" color="inherit">
                            {metadata.get("title")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>
                                        <i className={styles.layerInfoIcon + " ms ms-satellite"} />
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText
                                    primary={metadata.get("platform")}
                                    secondary="Platform"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>
                                        <i className={styles.layerInfoIcon + " ms ms-merge"} />
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText
                                    primary={metadata.get("spatialResolution")}
                                    secondary="Spatial Resolution"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <AccessTimeIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={metadata.get("dateRange")}
                                    secondary="Date Range"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <HdrStrongIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={metadata.get("dataSetVersion")}
                                    secondary="Data Set Version"
                                />
                            </ListItem>
                            <ListItem
                                onClick={_ => window.open(metadata.get("dataSetURL"), "_blank")}
                                style={{ cursor: "pointer" }}
                            >
                                <ListItemIcon>
                                    <HttpIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={metadata.get("dataSetURL")}
                                    secondary="Data Set URL"
                                />
                            </ListItem>
                        </List>
                        <Divider className={styles.divider} />
                        <Typography gutterBottom variant="subheading">
                            Description
                        </Typography>
                        <Typography variant={"body1"}>{metadata.get("description")}</Typography>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

LayerInfoContainer_Extended.propTypes = {
    appActions: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    layerId: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    thumbnailAltText: PropTypes.string,
    metadata: PropTypes.object.isRequired,
    layerMetadataAsync: PropTypes.object.isRequired,
    className: PropTypes.string
};

function mapStateToProps(state) {
    return {
        isOpen: state.layerInfo.get("isOpen"),
        layerId: state.layerInfo.get("activeLayerId"),
        thumbnailUrl: state.layerInfo.get("activeThumbnailUrl"),
        thumbnailAltText: state.layerInfo.get("activeThumbnailAltText"),
        metadata: state.layerInfo.get("metadata"),
        layerMetadataAsync: state.asynchronous.get("layerMetadataAsync")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerInfoContainer_Extended);
