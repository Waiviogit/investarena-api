const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const { performerTypes } = require('../../constants/performerStatistic');

const PerformerStatisticSchema = new Schema( {
        id: { type: String, required: true }, // authorPermlink - for instruments; name - for users
        name: { type: String },
        avatar: { type: String, default: '' },
        type: { type: String, enum: [ performerTypes.USER, performerTypes.INSTRUMENT ] },
        // Profitability percentage by periods:
        // by days:
        d1: { type: Number, default: null },
        d7: { type: Number, default: null },
        // by months:
        m1: { type: Number, default: null },
        m3: { type: Number, default: null },
        m6: { type: Number, default: null },
        m12: { type: Number, default: null },
        m24: { type: Number, default: null },
    },
    {
        toObject: { virtuals: true }, timestamps: true
    }
);

PerformerStatisticSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model( 'PerformerStatistic', PerformerStatisticSchema);
