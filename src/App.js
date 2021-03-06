import React, { useState, useEffect } from "react";
import "./App.css";
import Tesseract from "tesseract.js";
import TextWrapper from "./components/TextWrapper";
import ImageWrapper from "./components/ImageWrapper";
import axios from "axios";

// create account on imgbb and go to > about section > and get that api key and put it here

const API_KEY = "023ad1c3738db81d8e56fa1e4af437f9";

function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState(null);

  const convertImageToText = async () => {
    setLoading(true);
    console.log(`Converting image to text...`);
    const result = await Tesseract.recognize(
      imageUrl,
      [document.getElementById("OCR-Selected-language").value]
      //    [
      //   "ara",
      //   "eng",
      //   "heb",
      //   "hin",
      //   "ell",
      //   "rus",
      //   "srp",
      //   "chi_sim",
      //   "chi_tra",
      // ]
    );
    setText(result.data.text);
    setLoading(false);
  };

  const uploadFile = async (e) => {
    try {
      setLoading(true);
      console.log(`Uploading the File...`);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData,
        config
      );
      setImageUrl(res.data.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (imageUrl != null) {
      convertImageToText();
    }
  }, [imageUrl]);

  function translation() {
    const axios = require("axios").default;
    const uuidv4 = require("uuid/v4");

    var subscriptionKey = "76383d7ed8264578b9d1ea4e4e8fef94";
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    axios({
      baseURL: endpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: document.getElementById("from-language").value,
        to: document.getElementById("select-language").value,
      },
      data: [
        {
          text: document.getElementById("text-to-translate").value,
        },
      ],
      responseType: "json",
    }).then((response) => {
      if (document.getElementById("from-language").value == "") {
        document.getElementById("detected-language-result").value =
          response.data[0].detectedLanguage.language;
      } else {
        document.getElementById(
          "detected-language-result"
        ).value = document.getElementById("from-language").value;
      }
      document.getElementById("translated-language-result").value =
        response.data[0].translations[0].to;
      document.getElementById("translation-result").value =
        response.data[0].translations[0].text;
    });
  }
  return (
    <div className="App">
      <h1>UCITA OCR</h1>

      <div className="container">
        <div>
          <select id="OCR-Selected-language" className="dropdown">
            <option value="afr"> Afrikaans </option>
            <option value="ara"> Arabic </option>
            <option value="ben"> Bengali </option>
            <option value="bul"> Bulgarian </option>
            <option value="cat"> Catalan </option>
            <option value="ces"> Czech </option>
            <option value="chi_sim"> Chinese </option>
            <option value="chi_tra"> Traditional Chinese </option>
            <option value="dan"> Danish </option>
            <option value="deu"> German </option>
            <option value="ell"> Greek </option>
            <option value="eng" selected="selected">
              English
            </option>
            <option value="enm">English (Old)</option>
            <option value="fin"> Finnish </option>
            <option value="fra"> French </option>
            <option value="frm"> French (Old) </option>
            <option value="grc"> Ancient Greek </option>
            <option value="heb"> Hebrew </option>
            <option value="hin"> Hindi </option>
            <option value="hrv"> Croatian </option>
            <option value="hun"> Hungarian </option>
            <option value="ind"> Indonesian </option>
            <option value="isl"> Icelandic </option>
            <option value="ita"> Italian </option>
            <option value="ita_old"> Italian (Old) </option>
            <option value="jpn"> Japanese </option>
            <option value="kan"> Kannada </option>
            <option value="kor"> Korean </option>
            <option value="lit"> Lithuanian </option>
            <option value="msa"> Malay </option>
            <option value="nld"> Dutch </option>
            <option value="nor"> Norwegian </option>
            <option value="pol"> Polish </option>
            <option value="por"> Portuguese </option>
            <option value="ron"> Romanian </option>
            <option value="rus"> Russian </option>
            <option value="slk"> Slovakian </option>
            <option value="slv"> Slovenian </option>
            <option value="spa"> Spanish </option>
            <option value="spa_old"> Old Spanish </option>
            <option value="sqi"> Albanian </option>
            <option value="srp"> Serbian (Latin) </option>
            <option value="swa"> Swahili </option>
            <option value="swe"> Swedish </option>
            <option value="tam"> Tamil </option>
            <option value="tel"> Telugu </option>
            <option value="tgl"> Tagalog </option>
            <option value="tha"> Thai </option>
            <option value="tur"> Turkish </option>
            <option value="ukr"> Ukrainian </option>
            <option value="vie"> Vietnamese </option>
          </select>
        </div>
        {loading && <div className="loader"></div>}
        {text == null ? (
          <ImageWrapper loading={loading} uploadFile={uploadFile} />
        ) : (
          <TextWrapper text={text} />
        )}
        <br></br>
        <h1>UCITA TRANSLATION</h1>
        <div className="border">
          <div>
            <br></br>
            <label htmlFor="select-language">
              <strong>Translate from:</strong>
              <br></br>
            </label>
            <select id="from-language" className="dropdown">
              <option value="" selected="selected">
                Detect Language
              </option>
              <option value="af"> Afrikaans </option>
              <option value="ar">Arabic</option>
              <option value="bn"> Bengali </option>
              <option value="bg"> Bulgarian </option>
              <option value="ca">Catalan</option>
              <option value="zh-Hans">Chinese (Simplified)</option>
              <option value="zh-Hant">Chinese (Traditional)</option>
              <option value="hr">Croatian</option>
              <option value="cs">Czech </option>
              <option value="da">Danish</option>
              <option value="nl">Dutch </option>
              <option value="en">English</option>
              <option value="et">Estonian </option>
              <option value="fr">French</option>
              <option value="fi">Finnish </option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hu">Hungarian </option>
              <option value="is">Icelandic </option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="kn">Kannada </option>
              <option value="ko">Korean</option>
              <option value="lv">Latvian </option>
              <option value="lt">Lithuanian </option>
              <option value="ms">Malay </option>
              <option value="mt"> Maltese </option>
              <option value="nb"> Norwegian </option>
              <option value="pl"> Polish </option>
              <option value="pt">Portuguese</option>
              <option value="ro"> Romanian </option>
              <option value="ru">Russian</option>
              <option value="sr-Latn">Serbian (Latin) </option>
              <option value="es">Spanish</option>
              <option value="sw"> Swahili </option>
              <option value="sv"> Swedish </option>
              <option value="th">Thai</option>
              <option value="tr">Turkish</option>
              <option value="uk"> Ukrainian </option>
              <option value="vi">Vietnamese</option>
            </select>
            <br></br>
            <label htmlFor="select-language">
              <strong>Translate to:</strong>
              <br></br>
            </label>
            <select id="select-language" className="dropdown">
              <option value="af"> Afrikaans </option>
              <option value="ar" selected="selected">
                Arabic
              </option>
              <option value="bn"> Bengali </option>
              <option value="bg"> Bulgarian </option>
              <option value="ca">Catalan</option>
              <option value="zh-Hans">Chinese (Simplified)</option>
              <option value="zh-Hant">Chinese (Traditional)</option>
              <option value="hr">Croatian</option>
              <option value="cs">Czech </option>
              <option value="da">Danish</option>
              <option value="nl">Dutch </option>
              <option value="en">English</option>
              <option value="et">Estonian </option>
              <option value="fr">French</option>
              <option value="fi">Finnish </option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hu">Hungarian </option>
              <option value="is">Icelandic </option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="kn">Kannada </option>
              <option value="ko">Korean</option>
              <option value="lv">Latvian </option>
              <option value="lt">Lithuanian </option>
              <option value="ms">Malay </option>
              <option value="mt"> Maltese </option>
              <option value="nb"> Norwegian </option>
              <option value="pl"> Polish </option>
              <option value="pt">Portuguese</option>
              <option value="ro"> Romanian </option>
              <option value="ru">Russian</option>
              <option value="sr-Latn">Serbian (Latin) </option>
              <option value="es">Spanish</option>
              <option value="sw"> Swahili </option>
              <option value="sv"> Swedish </option>
              <option value="th">Thai</option>
              <option value="tr">Turkish</option>
              <option value="uk"> Ukrainian </option>
              <option value="vi">Vietnamese</option>
            </select>
          </div>
          <br></br>
          <button
            onClick={translation}
            type="submit"
            className="btn btn-primary mb-2"
            id="translate"
          >
            <h3>Translate text</h3>
          </button>
          <div id="detected-language">
            <strong>Detected language:</strong>
            {"  "}
            <textarea id="detected-language-result"></textarea>
          </div>
          <br></br>
          <div id="detected-language">
            <strong>Translated to:</strong>
            {"  "}
            <textarea id="translated-language-result"></textarea>
          </div>
          <br></br>
          <div id="translator-text-response">
            <label htmlFor="translation-result">
              <strong>Translated text:</strong>
              <br></br>
            </label>
          </div>
          <textarea className="text-wrapper" id="translation-result"></textarea>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default App;
