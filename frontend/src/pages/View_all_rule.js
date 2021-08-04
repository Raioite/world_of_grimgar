import React, { useEffect } from "react";
import "./style.css";
import { useParams, useHistory } from "react-router-dom";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Backspace from './backspace.png' // relative path to image 


export default function View_all_rule() {
  var url = window.location.href;
  url = url.split("/");
  const { id } = useParams();

  const [loregroup_state, set_lores_state] = React.useState({
    lores: [],
  });

  useEffect(
    () =>
        fetch("/api/lore/group/8")
        .then((response) => response.json())
        .then((data) => set_lores_state({ lores: data })),
    [],
  );

  const [quote_state, set_quote_state] = React.useState({
    quote: [],
  });

  useEffect(
    () =>
      fetch("/api/quote/")
        .then((response) => response.json())
        .then((data) => set_quote_state({ quote: data })),
    []
  );

  const random = Math.floor(Math.random() * quote_state.quote.length) + 1;

  return (
    <div>
      <Logo />
      <Navbar />
      <div id="wrapper">
        <div id="page">
          <div id="page-bgtop">
            <div id="page-bgbtm">
            <div id="content">
                <div id="post">
                  <h2 class="title" id="knowledge_title">
                    The Collection of the Lore of Grimgar
                  </h2>
                  <div class="entry">
                    <div id="slideshow_container"></div>
                    <p id="knowledge_text">
                      On this page you will find most when it commes to the Lore
                      and information related to Grimgar and its Universe.
                    </p>
                  </div>
                </div>
                <div id="smallPosts">
                  {loregroup_state.lores.map((lore) => (
                    <div class="">
                      <a href={`/${url[3]}/${lore.id}`}>
                        <img src={lore.image}/>
                        <p class="knowledge_list_title">{lore.name}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div id="sidebar">
                <ul id="entire_list">
                  {
                  quote_state.quote.slice(random-1, random).map((quote) => (
                    <li id="quote">
                      <h2>Quote</h2>
                      <p id="quote_text">"{quote.quote}"</p>
                      <p id="quoter_text">- {quote.quoter}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{clear:'both'}}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
