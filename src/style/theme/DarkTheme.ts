const { createGlobalStyle } = require('styled-components');

const DarkTheme = createGlobalStyle`

  :root {

    --background-color: #2d2d2d;
    --modal-background-color: rgb(61,62,65); ;
    --modal-blur-color: rgba(255, 255, 255, 0.2);
    --modal-hover-color: #2d2d2d;

    --basic-color-1: #0085ff; 
    --basic-color-2: #006fff;

    --input-box-color: rgb(61,62,65); 
    --box-shadow-color:#DBDBDB; 

    --border-color: #FDE767;
    --skeleton-color: rgb(61,62,65); 

    --basic-btn-color: #0085ff;
    --bold-btn-color: #006fff;
    --disabled-btn-color: #E6E2E2;

    --disabled-btn-text-color: #BFBFBF;

    
    --text-color-1: #DDD;
    --text-color-2: #9E9E9E;
    --text-color-3: #C4C3C3;
    --text-color-4: rgb(238,241,244);
    --logo-color: #FFF;
    
    --common-text-color-1: #FFF;
    --common-text-color-2: #000;
    --invert-color: #FFF;
    
    --icon-active-on: #DBDBDB;
    --icon-active-off: #767676;

    /* --header-shadow: 0px 4px 4px rgba(255, 255, 255, 0.10); */
    --navbar-shadow: 0 -1px rgba(255, 255, 255, 0.10);
    --header-color: #1E1E1E;
    --navbar-color: #1E1E1E;
  }
`;

export default DarkTheme;
