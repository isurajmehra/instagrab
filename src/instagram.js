const axios = require('axios');

const extractMediaFromNode = node => (
  node.is_video
    ? { media_type: 2, url: node.video_url }
    : { media_type: 1, url: node.display_url }
);

export default function getPosts(url) {
  // url format ➡ https://www.instagram.com/p/BFnmHd8NYTo
  return new Promise((resolve, reject) => {
    const apiUrl = `${url}/?__a=1`;
    axios.get(apiUrl).then(({ data }) => {
      const media = data.graphql.shortcode_media;

      // multiple posts
      const children = media.edge_sidecar_to_children;

      const posts = children
        ? children.edges.map(edge => extractMediaFromNode(edge.node))
        : [extractMediaFromNode(media)];

      resolve(posts);
    })
      .catch(error => reject(error));
  });
}
