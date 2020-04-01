const _ = require('lodash');
const { Post: PostService } = require('../../models');
const waivioApi = require('../requests/waivioApi');
const { waivioAPIData } = require('../../constants/platformData');

const getWithForecast = async ({ skip, limit, author_permlink, name }) => {
    let posts;
    if (name) {
        let { posts: postsByAuthor, error } = await PostService.getWithForecastByAuthor({ skip, limit, author: name });
        if(error) return{ error };
        posts = postsByAuthor;
    } else if(author_permlink) {
        let { posts: postsByWobject, error } = await PostService.getWithForecastByWobject({ skip, limit, author_permlink });
        if(error) return{ error };
        posts = postsByWobject;
    }
    if (!posts || !posts.length) return { posts: [] };
    const request = {
        method: 'post',
        url: `${waivioAPIData.BASE_API_URL}${waivioAPIData.GET_MANY_POSTS}`,
        data: _.map(posts, (post) => ({
            author: post.author,
            permlink: post.permlink
        })
        )
    };
    let { error: requestError, result } = await waivioApi.getData(request);
    if (requestError)return { error: requestError };
    result = _.forEach(result, (post) => {
        const forecast = posts.find((p) => p.author === post.author && p.permlink === post.permlink);
        post = Object.assign(post, _.omit(forecast, [ 'wobjects' ]));
        return post;
    });
    return{ posts: fillObjects(result) };
};

const fillObjects = (posts, wobjects_path = 'fullObjects') => {
    for (const post of posts) {
        for (let wObject of post.wobjects) {
            wObject = Object.assign(wObject, post[ wobjects_path ].find((i) => i.author_permlink === wObject.author_permlink));
        }
        delete post[ wobjects_path ];
    }
    return posts;
};

module.exports = { getWithForecast };
