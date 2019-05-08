import React, { Component } from "react";
import styled from "styled-components";
import { IoLogoGithub } from "react-icons/io";

var Foot = styled.p`
  margin: 0.4% 9%;
  padding-top: 3px;
  font-size: 30px;
`;
var B = styled.a`
  margin: 0 2%;
  font-size: 75%;
  color: blueviolet;
`;

var Div = styled.div`
border:solid red 1px`;

export default class Footer extends Component {
  render() {
    return (
      <Div>
        <Foot>
          <nav>
            <a href="https://github.com/labs12-should-i-live-here/Front-End">
              <IoLogoGithub />
            </a>
            <B>sitemap</B>
          </nav>
        </Foot>
      </Div>
    );
  }
}

//react-router-sitemap might be the best option for a sitemap generator. Sitemaps help with the SEO
