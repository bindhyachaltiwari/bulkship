
const PerformanceDetails = require('../models/performanceDetails');

exports.addPerformanceData = (req, res) => {
    const performanceDetailsData = new PerformanceDetails(req.body.data);
    if (!performanceDetailsData.isDetailsFilled) {
        performanceDetailsData.vId = new Date().getTime();
        performanceDetailsData.cpDate = performanceDetailsData.cpDate.split('T')[0];
    }
    performanceDetailsData.save().then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: e
        });
    });
}

exports.getCompletePerformanceDetailsForView = (req, res) => {
    PerformanceDetails.find({ $and: [{ chartererName: req.params.userName }, { vesselName: req.params.vesselName }, { cpDate: req.params.cpDate }] }, (err, v) => {
        if (!v.length || err) {
            res.json({ status: false, error: 'No details found' });
            return;
        }
        if (v.length) {
            v = v[0];
            res.json({
                status: true,
                performanceDetails: v
            });
        } else {
            res.json({ status: false });
        }
    });
}

exports.getAllVessels = (req, res) => {
    PerformanceDetails.find({ isDetailsFilled: req.params.isDetailsFilled }, (err, vl) => {
        if (!vl) {
            res.json({ status: false, error: err });
            return;
        }
        if (vl.length) {
            res.json({ status: true, vesselList: vl });
        } else {
            res.json({ status: false });
        }
    });
}

exports.fillPerformanceDetails = (req, res) => {
    PerformanceDetails.findOne({ _id: req.body.data.vId }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not found' });
            return;
        }
        let data = req.body.data;
        PerformanceDetails.update(
            { _id: req.body.data.vId },
            {
                $set: {
                    'isDetailsFilled': true,
                    addressCommission: data.addressCommission,
                    bunkerIFOAct: data.bunkerIFOAct,
                    bunkerIFOOrg: data.bunkerIFOOrg,
                    bunkerMDOAct: data.bunkerMDOAct,
                    bunkerMDOOrg: data.bunkerMDOOrg,
                    dischargePortDAAct$: data.dischargePortDAAct$,
                    dischargePortDAOrg$: data.dischargePortDAOrg$,
                    intermediatePortDAOrg$: data.intermediatePortDAOrg$,
                    intermediatePortDAAct$: data.intermediatePortDAAct$,
                    dischargePortDelay: data.dischargePortDelay,
                    intermediatePortDelay: data.intermediatePortDelay,
                    loadPortDAAct$: data.loadPortDAAct$,
                    loadPortDAOrg$: data.loadPortDAOrg$,
                    loadPortDelay: data.loadPortDelay,
                    tcHire: data.tcHire,
                    freightAct: data.freightAct,
                    freightOrg: data.freightOrg,
                    totalAct: data.totalAct,
                    totalOrg: data.totalOrg,
                    voyageDays: data.voyageDays,
                    CargoQuantityAct: data.CargoQuantityAct || 0,
                    CargoQuantityOrg: data.CargoQuantityOrg || 0,
                    ILOHCandCVEAct$: data.ILOHCandCVEAct$ || 0,
                    ILOHCandCVEOrg$: data.ILOHCandCVEOrg$ || 0,
                    PNIInsuranceAct$: data.PNIInsuranceAct$ || 0,
                    PNIInsuranceOrg$: data.PNIInsuranceOrg$ || 0,
                    bunkerSurveyCostBendsAct$: data.bunkerSurveyCostBendsAct$ || 0,
                    bunkerSurveyCostBendsOrg$: data.bunkerSurveyCostBendsOrg$ || 0,
                    despatchPaidAct$: data.despatchPaidAct$ || 0,
                    despatchPaidOrg$: data.despatchPaidOrg$ || 0,
                    otherExpenseOrg$: data.otherExpenseOrg$ || 0,
                    otherExpenseAct$: data.otherExpenseAct$ || 0,
                    wXRoutingExpenseAct$: data.wXRoutingExpenseAct$ || 0,
                    wXRoutingExpenseOrg$: data.wXRoutingExpenseOrg$ || 0,
                    demmurrageReceivedOrg$: data.demmurrageReceivedOrg$ || 0,
                    demmurrageReceivedAct$: data.demmurrageReceivedAct$ || 0,
                    HraWarRiskOrg$: data.HraWarRiskOrg$,
                    HraWarRiskAct$: data.HraWarRiskAct$,
                    remarks: data.remarks
                }
            }
        ).then(e => {
            res.json({ status: true });
            return;
        });
    });
}

exports.getPerformanceDetails = (req, res) => {
    PerformanceDetails.findOne({ $and: [{ chartererName: req.params.chartererName }, { vesselName: req.params.vesselName }, { cpDate: req.params.cpDate }] })
        .then((performance) => {
            if (!performance) {
                res.json({ status: false, err: 'performance not found' });
                return;
            }
            res.json({
                status: true,
                performanceDetails: {
                    addressCommission: performance.addressCommission,
                    bunkerIFOAct: performance.bunkerIFOAct,
                    bunkerIFOOrg: performance.bunkerIFOOrg,
                    bunkerMDOAct: performance.bunkerMDOAct,
                    bunkerMDOOrg: performance.bunkerMDOOrg,
                    dischargePortDAAct$: performance.dischargePortDAAct$,
                    dischargePortDAOrg$: performance.dischargePortDAOrg$,
                    dischargePortDelay: performance.dischargePortDelay,
                    intermediatePortDelay: performance.intermediatePortDelay,
                    loadPortDAAct$: performance.loadPortDAAct$,
                    loadPortDAOrg$: performance.loadPortDAOrg$,
                    intermediatePortDAOrg$: performance.intermediatePortDAOrg$,
                    intermediatePortDAAct$: performance.intermediatePortDAAct$,
                    loadPortDelay: performance.loadPortDelay,
                    tcHire: performance.tcHire,
                    freightAct: performance.freightAct,
                    freightOrg: performance.freightOrg,
                    totalAct: performance.totalAct,
                    totalOrg: performance.totalOrg,
                    voyageDays: performance.voyageDays,
                    CargoQuantityAct: performance.CargoQuantityAct,
                    CargoQuantityOrg: performance.CargoQuantityOrg,
                    ILOHCandCVEAct$: performance.ILOHCandCVEAct$,
                    ILOHCandCVEOrg$: performance.ILOHCandCVEOrg$,
                    PNIInsuranceAct$: performance.PNIInsuranceAct$,
                    PNIInsuranceOrg$: performance.PNIInsuranceOrg$,
                    bunkerSurveyCostBendsAct$: performance.bunkerSurveyCostBendsAct$,
                    bunkerSurveyCostBendsOrg$: performance.bunkerSurveyCostBendsOrg$,
                    despatchPaidAct$: performance.despatchPaidAct$,
                    despatchPaidOrg$: performance.despatchPaidOrg$,
                    otherExpenseOrg$: performance.otherExpenseOrg$,
                    otherExpenseAct$: performance.otherExpenseAct$,
                    wXRoutingExpenseAct$: performance.wXRoutingExpenseAct$,
                    wXRoutingExpenseOrg$: performance.wXRoutingExpenseOrg$,
                    demmurrageReceivedOrg$: performance.demmurrageReceivedOrg$,
                    demmurrageReceivedAct$: performance.demmurrageReceivedAct$,
                    HraWarRiskOrg$: performance.HraWarRiskOrg$,
                    HraWarRiskAct$: performance.HraWarRiskAct$,
                    remarks: performance.remarks
                }
            });
        })
        .catch((e) => {
            res.json({ status: false });
        });
}