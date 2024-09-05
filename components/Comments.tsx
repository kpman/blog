import { DiscussionEmbed } from 'disqus-react';

const Comments = ({ shortname, siteUrl, slug, title }) => (
  <div className="mt-10">
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
