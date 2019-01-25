const {Wobj} = require('../../models');
const {validator} = require('../../validator');

const formatAndCreate = async (instruments) => {
    if(!validator.validateInputInstruments({instruments})){
        return {error: 'data is invalid'}
    }
    let created = 0;
    let failed = 0;
    for (const instrument of instruments) {
        let wobject = {
            author_permlink: instrument.id,
            object_type: instrument.type,
            default_name: instrument.name,
            is_posting_open: true,
            is_extending_open: false,
            author: 'monterey',
            creator: 'monterey',
            app: 'investarena/1.0.0',
            weight: 1,
            fields: [
                {
                    weight: 1,
                    locale: 'en-US',
                    name: 'name',
                    body: instrument.name,
                    author: 'monterey',
                    creator: 'monterey',
                    permlink: 'monterey',
                    active_votes: []
                },
                {
                    weight: 1,
                    locale: 'en-US',
                    name: 'title',
                    body: instrument.title,
                    author: 'monterey',
                    creator: 'monterey',
                    permlink: 'monterey',
                    active_votes: []
                },
                {
                    weight: 1,
                    locale: 'en-US',
                    name: 'avatar',
                    body: instrument.avatar,
                    author: 'monterey',
                    creator: 'monterey',
                    permlink: 'monterey',
                    active_votes: []
                }
            ]
        };
        if(instrument.description){
            wobject.fields.push({
                    weight: 1,
                    locale: 'en-US',
                    name: 'description',
                    body: instrument.description,
                    author: 'monterey',
                    creator: 'monterey',
                    permlink: 'monterey',
                    active_votes: []
                });
        }
        if(instrument.background){
            wobject.fields.push({
                    weight: 1,
                    locale: 'en-US',
                    name: 'background',
                    body: instrument.background,
                    author: 'monterey',
                    creator: 'monterey',
                    permlink: 'monterey',
                    active_votes: []
                });
        }

        const {wObject, error} = await Wobj.create(wobject);
        if (wObject) {
            console.log(`Wobject ${instrument.name} created!`);
            created++;
        } else if (error) {
            failed++;
        }
    }
    return {created, failed}
};

module.exports = {formatAndCreate}