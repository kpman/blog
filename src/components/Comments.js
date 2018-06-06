import React from 'react';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';

const Wrapper = styled.div`
  margin-top: 10px;
`;

const Comments = ({ shortname, siteUrl, slug, title }) => (
  <Wrapper>
    <DiscussionEmbed
      shortname={shortname}
      config={{
        url: `${siteUrl}${slug}`,
        identifier: slug,
        title,
      }}
    />
  </Wrapper>
);

export default Comments;
