const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const UserStatisticSchema = new Schema( {
        name: { type: String },
    // Profitability of user's forecasts by periods:
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

UserStatisticSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model( 'UserStatistic', UserStatisticSchema);
