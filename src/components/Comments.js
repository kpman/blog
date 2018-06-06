import React from 'react';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';

const Wrapper = styled.div`
  margin-top: 10px;
`;

const Comments = ({ shortname }) => (
  <Wrapper>
    <DiscussionEmbed shortname={shortname} />
  </Wrapper>
);

export default Comments;
