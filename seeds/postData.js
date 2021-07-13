const { Post } = require('../models');

const postdata = [{
        title: "Gerald's First Post",
        post_content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt mauris mauris, ut malesuada libero sodales nec. Curabitur maximus vulputate est, ac blandit ipsum luctus congue. Nulla a ipsum euismod, tristique nulla eu, posuere orci. Maecenas eget ullamcorper dolor, ac pulvinar ante. Nunc vel est turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque egestas nisl at hendrerit ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nibh nec eros auctor commodo quis sed lacus. Sed rutrum ex nulla, at pellentesque libero sodales at. Donec accumsan dolor sed fringilla semper. Integer quis ligula justo. Praesent nec metus id quam ullamcorper molestie. Donec vehicula quam et felis varius egestas.

Integer commodo mollis felis et consequat. Nulla facilisi. Nulla vehicula erat mi, sed molestie erat sollicitudin at. Integer sollicitudin velit sapien, sed eleifend risus auctor et. Ut porttitor blandit ipsum ullamcorper ornare. Nullam tincidunt sit amet purus id maximus. Etiam sed nibh magna.

Quisque faucibus dui nec orci lacinia, at sodales diam tempor. Suspendisse semper felis non finibus tristique. Nullam mollis eget purus quis mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet facilisis velit, sagittis euismod lectus tincidunt id. Suspendisse potenti. Proin ac massa eleifend, venenatis felis a, molestie velit. Etiam faucibus justo vel dictum egestas.`,
        user_id: 1,
    },
    {
        title: "Matt's First Post",
        post_content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt mauris mauris, ut malesuada libero sodales nec. Curabitur maximus vulputate est, ac blandit ipsum luctus congue. Nulla a ipsum euismod, tristique nulla eu, posuere orci. Maecenas eget ullamcorper dolor, ac pulvinar ante. Nunc vel est turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque egestas nisl at hendrerit ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nibh nec eros auctor commodo quis sed lacus. Sed rutrum ex nulla, at pellentesque libero sodales at. Donec accumsan dolor sed fringilla semper. Integer quis ligula justo. Praesent nec metus id quam ullamcorper molestie. Donec vehicula quam et felis varius egestas.

Integer commodo mollis felis et consequat. Nulla facilisi. Nulla vehicula erat mi, sed molestie erat sollicitudin at. Integer sollicitudin velit sapien, sed eleifend risus auctor et. Ut porttitor blandit ipsum ullamcorper ornare. Nullam tincidunt sit amet purus id maximus. Etiam sed nibh magna.

Quisque faucibus dui nec orci lacinia, at sodales diam tempor. Suspendisse semper felis non finibus tristique. Nullam mollis eget purus quis mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet facilisis velit, sagittis euismod lectus tincidunt id. Suspendisse potenti. Proin ac massa eleifend, venenatis felis a, molestie velit. Etiam faucibus justo vel dictum egestas.`,
        user_id: 2,
    }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;