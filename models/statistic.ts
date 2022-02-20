import { Schema, model } from 'mongoose';

const CaseSchema = new Schema ({
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
});

const DeathSchema = new Schema ({
    new: {
        type: String || null
    },
    '1M_pop': {
        type: String || null
    },
    total: {
        type: Number
    }
});

const TestSchema = new Schema ( {
    '1M_pop': {
        type: String || null
    },
    total: {
        type: Number
    }
});

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
        type: CaseSchema
    },
    deaths: {
        type: DeathSchema
    },
    tests: {
        type: TestSchema
    },
    day: {
        type: Date
    },
    time: {
        type: Date
    }
});

export default model('Statistic', StatisticSchema);