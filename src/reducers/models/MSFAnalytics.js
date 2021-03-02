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
        startDate: moment("2000-01-01"),
        //endDate: moment(Date.now())  //This messes with the cache as enddate keep changing.  Hardcoding to 2040 but needs better solution (i.e. latest entry in DB)
        endDate: moment("2040-01-01")
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
