import Immutable from "immutable";
import * as MSFTypes from "constants/MSFTypes";
import moment from "moment";

export const MSFAnalyticsState = Immutable.fromJS({
    analyticsMode: MSFTypes.ANALYTICS_MODE_PLUME_DETECTION_STATS,
    filterOptions: {
        selectedArea: null,
        selectedSector: null,
        selectedSubsector: null,
        selectedUnits: "kg",
        //startDate: moment("2000-01-01"),  // Don't want to imply records back to 2000.  Should set to ealiest plume/flight record
        //endDate: moment(Date.now())  //This messes with the cache as enddate keep changing.  Hardcoding to 2018-10-10 22:19:28 but should query latest entry in DB on launch
        startDate: moment("2016-09-10 18:57:02"),  // Suggest populating with response from api on earliest plume/flight record, set in appconfig at page load
        endDate: moment("2018-10-10 22:19:28")     // Suggest populating with response from api on latest plume/flight record, set in appconfig at page load
    },
    summaryDataIsLoading: false,
    summaryData: null,
    filteredSummaryData: null,
    emissionsSourceData: null,
    emissionsSourceDataIsLoading: false,
    detectionStatsAreLoading: false,
    detectionStats: null,
    areaSearchOptionsLoading: false,
    areaSearchOptionsList: null,
    vistaCategoryOptionsLoading: false,
    vistaCategoryOptionsList: null,
    ipccSectorOptionsLoading: false,
    ipccSectorOptionsList: null,
    emissionsSummarySourceStartIndex: 0
});
