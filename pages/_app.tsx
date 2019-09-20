import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';

export default class Application extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="apple-mobile-web-app-title" content="AlorgGames"></meta>
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="A place to put games I've played, playing, or have stop playing"
          />

          <link rel="manifest" href="static/manifest.json" />
          <link rel="icon" type="image/png" href="static/cd.png" />
          <link rel="apple-touch-icon" href="/static/cd.png"></link>
          <title>Games</title>
        </Head>
        {/* put global context stuff here */}
        <Component {...pageProps} />
        <style jsx global>{`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          html,
          body,
          p,
          div,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          ul,
          ol,
          dl,
          img,
          pre,
          form,
          fieldset {
            margin: 0;
            padding: 0;
          }
          img,
          fieldset {
            border: 0;
          }

          body,
          html {
            height: 100%;
            width: 100%;
          }

          body {
            background-color: #fff;
            color: #333333;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.42857142857143;
            -ms-overflow-style: -ms-autohiding-scrollbar;
            text-decoration-skip-ink: auto;
          }

          /* Default margins */
          p,
          ul,
          ol,
          dl,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          blockquote,
          pre,
          form,
          table {
            margin: 12px 0 0 0;
          }

          /* Links */

          /* Headings */
          h1 {
            font-size: 2.0714285714285716em;
            font-style: inherit;
            line-height: 1.103448275862069;
            font-weight: 600;
            letter-spacing: -0.01em;
            margin-top: 40px;
          }
          h2 {
            font-size: 1.7142857142857142em;
            font-style: inherit;
            line-height: 1.1666666666666667;
            font-weight: 500;
            letter-spacing: -0.01em;
            margin-top: 40px;
          }
          h3 {
            font-size: 1.4285714285714286em;
            font-style: inherit;
            line-height: 1.2;
            font-weight: 500;
            letter-spacing: -0.008em;
            margin-top: 28px;
          }
          h4 {
            font-size: 1.1428571428571428em;
            font-style: inherit;
            line-height: 1.25;
            font-weight: 600;
            letter-spacing: -0.006em;
            margin-top: 24px;
          }
          h5 {
            font-size: 1em;
            font-style: inherit;
            line-height: 1.1428571428571428;
            font-weight: 600;
            letter-spacing: -0.003em;
            margin-top: 16px;
          }
          h6 {
            font-size: 0.8571428571428571em;
            font-style: inherit;
            line-height: 1.3333333333333333;
            color: #172b4d;
            font-weight: 600;
            margin-top: 20px;
            text-transform: uppercase;
          }

          /* Lists */
          ul,
          ol,
          dl {
            padding-left: 40px;
          }
          [dir='rtl']ul,
          [dir='rtl']ol,
          [dir='rtl']dl {
            padding-left: 0;
            padding-right: 40px;
          }

          dd,
          dd + dt,
          li + li {
            margin-top: 4px;
          }
          ul ul:not(:first-child),
          ol ul:not(:first-child),
          ul ol:not(:first-child),
          ol ol:not(:first-child) {
            margin-top: 4px;
          }

          /* remove top margin for first element */
          p:first-child,
          ul:first-child,
          ol:first-child,
          dl:first-child,
          h1:first-child,
          h2:first-child,
          h3:first-child,
          h4:first-child,
          h5:first-child,
          h6:first-child,
          blockquote:first-child,
          pre:first-child,
          form:first-child,
          table:first-child {
            margin-top: 0;
          }

          /* Quotes */
          blockquote,
          q {
            color: inherit;
          }
          blockquote {
            border: none;
            padding-left: 40px;
          }
          [dir='rtl'] blockquote {
            padding-left: 0;
            padding-right: 40px;
          }

          blockquote::before,
          q::before {
            content: '\\201C';
          }

          blockquote::after,
          q::after {
            content: '\\201D';
          }

          blockquote::before {
            float: left;
            /* to keep the quotes left of any child elements like blockquote > p */
            margin-left: -1em;
            text-align: right;
            width: 1em;
          }
          [dir='rtl'] blockquote::before {
            float: right;
            margin-right: -1em;
            text-align: left;
          }

          blockquote > :last-child {
            display: inline-block; /* so the quotes added via pseudos follow it immediately. */
          }

          /* Other typographical elements */
          small {
            font-size: 0.7857142857142857em;
            font-style: inherit;
            line-height: 1.4545454545454546;
            font-weight: 700;
            margin-top: 16px;

            font-weight: normal;
          }

          code,
          kbd {
            font-family: 'SFMono-Medium', 'SF Mono', 'Segoe UI Mono',
              'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace;
          }

          var,
          address,
          dfn,
          cite {
            font-style: italic;
          }

          abbr {
            border-bottom: 1px #ccc dotted;
            cursor: help;
          }

          table {
            border-collapse: collapse;
            width: 100%;
          }

          thead,
          tbody,
          tfoot {
            border-bottom: 2px solid #dfe1e6;
          }

          td,
          th {
            border: none;
            padding: 4px 8px;
            text-align: left;
          }

          th {
            vertical-align: top;
          }

          td:first-child,
          th:first-child {
            padding-left: 0;
          }

          td:last-child,
          th:last-child {
            padding-right: 0;
          }

          caption {
            font-size: 1.4285714285714286em;
            font-style: inherit;
            line-height: 1.2;
            font-weight: 500;
            letter-spacing: -0.008em;
            margin-top: 28px;

            margin-bottom: 8px;
            text-align: left;
          }

          /* IE11 doesn't support <template> elements which shouldn't be displayed */
          template {
            display: none;
          }

          /* IE11 and some older browsers don't support these elements yet and treat them as display: inline; */
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          main,
          menu,
          nav,
          section {
            display: block;
          }

          /* Suppress the ugly broken image styling in Firefox */
          @-moz-document url-prefix() {
            img {
              font-size: 0;
            }
            img:-moz-broken {
              font-size: inherit;
            }
          }

          .assistive {
            border: 0 !important;
            clip: rect(1px, 1px, 1px, 1px) !important;
            height: 1px !important;
            overflow: hidden !important;
            padding: 0 !important;
            position: absolute !important;
            width: 1px !important;
            white-space: nowrap !important;
          }
        `}</style>
      </>
    );
  }
}
