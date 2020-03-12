const mongoose = require('mongoose');
const db = require('../ciadb_connect');

const { Schema } = mongoose;

const PostRefSchema = new Schema({
    author: { type: String, required: true },
    root_author: { type: String, default: '' },
    permlink: { type: String, required: true },
    wobjects: { type: [ String ], default: [], index: true }
}, { strict: false, timestamps: true });

PostRefSchema.index({ root_author: 1, permlink: 1 }, { unique: true });

const PostRefModel = db.model('postrefs', PostRefSchema);

module.exports = PostRefModel;
