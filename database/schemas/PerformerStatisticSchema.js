const mongoose = require('mongoose');

const { performerTypes } = require('../../constants/performerStatistic');
/*
    Example of period data: {d7: {pips: 2020, percent: 23,5, successful_count: 14, failed_count: 1}}
 */
const periodDataType = {
    type: {
        pips: {
            type: Number, get: v => Math.round(v), set: v => Math.round(v), default: 0,
        },
        percent: { type: Number, default: 0 },
        successful_count: {
            type: Number,
            get: v => Math.round(v),
            set: v => Math.round(v),
            default: 0,
            min: 0,
        },
        failed_count: {
            type: Number,
            get: v => Math.round(v),
            set: v => Math.round(v),
            default: 0,
            min: 0,
        },
    },
};

const PerformerStatisticSchema = new mongoose.Schema(
    {
        id: { type: String, required: true }, // authorPermlink - for instruments; name - for users
        name: { type: String },
        avatar: { type: String, default: '' },
        type: { type: String, enum: [performerTypes.USER, performerTypes.INSTRUMENT] },
        // Profitability percentage by periods:
        // by days:
        d1: periodDataType,
        d7: periodDataType,
        // by months:
        m1: periodDataType,
        m3: periodDataType,
        m6: periodDataType,
        m12: periodDataType,
        m24: periodDataType,
    },
    {
        toObject: { virtuals: true }, timestamps: true,
    },
);

PerformerStatisticSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model('PerformerStatistic', PerformerStatisticSchema);
