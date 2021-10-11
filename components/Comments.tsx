import { DiscussionEmbed } from 'disqus-react';

const Comments = ({ shortname, siteUrl, slug, title }) => (
  <div style={{ marginTop: '10px' }}>
    <DiscussionEmbed
      shortname={shortname}
      config={{
        url: `${siteUrl}${slug}`,
        identifier: slug,
        title,
      }}
    />
  </div>
);

export default Comments;
