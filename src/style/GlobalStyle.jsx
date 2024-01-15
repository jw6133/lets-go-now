import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* v2.0 | 20110126
  http://meyerweb.com/eric/tools/css/reset/ 
  License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	/* font: inherit; */
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
	text-decoration: none;
	color:black;
	&:visited{
		text-decoration:none;
	}
	&:hover{
		text-decoration:none;
	}
	&:focus{
		text-decoration:none;
	}
	&:active{
		text-decoration:none;
	}
}
img{
	display: block;
	width: 100%;
}
.container{
    max-width:1000px;
    margin:0px auto;
    padding:100px 0px;
}
body{
	max-width:450px;
}
.user-img{
	width: 36px;
	height:36px;
    border-radius:100%;
}
.loginBtn{
	margin-top:10px;
	height:30px;
	border-radius:30px;
	background-color:white;
	border:solid 1px black;
}
.logOutBtn{
	margin-top:10px;
	height:30px;
	border-radius:30px;
	background-color:black;
	color:white;
}
.linePhoto{

    height:30px;
    width:30px;
}
`

export default GlobalStyle