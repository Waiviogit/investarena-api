const { Post: PostService } = require('../../models');

const getWithForecastByAuthor = async ({ skip, limit, name }) => {
    let { posts, error } = await PostService.getWithForecastByAuthor({ skip, limit, author: name });
    if(error) return{ error };

    posts = fillObjects(posts); // format wobjects on each post
    return{ posts };
};

const getWithForecastByWobject = async ({ skip, limit, author_permlink }) => {
    let { posts, error } = await PostService.getWithForecastByWobject({ skip, limit, author_permlink });
    if(error) return{ error };

    posts = fillObjects(posts); // format wobjects on each post
    return{ posts };
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

module.exports = { getWithForecastByAuthor, getWithForecastByWobject };
