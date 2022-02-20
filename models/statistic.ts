import { Schema, model } from 'mongoose';

const StatisticSchema = new Schema({
    continent: {
        type: String || null,
    },
    country: {
        type: String || null,
    },
    population: {
        type: Number,
    },
    cases: {
        new: {
            type: String || null
        },
        active: {
            type: Number
        },
        critical: {
            type: Number
        },
        recovered: {
            type: Number
        },
        '1M_pop': {
            type: String || null
        },
        total: {
            type: Number
        }
    },
    deaths: {
        new: {
            type: String || null
        },
        '1M_pop': {
            type: String || null
        },
        total: {
            type: Number
        }
    },
    tests: {
        '1M_pop': {
            type: String || null
        },
        total: {
            type: Number
        }
    },
    day: {
        type: Date
    },
    time: {
        type: Date
    }
});

export default model('Statistic', StatisticSchema);