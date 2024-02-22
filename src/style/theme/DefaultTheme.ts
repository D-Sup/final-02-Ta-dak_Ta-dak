const { createGlobalStyle } = require('styled-components');

const DefaultTheme = createGlobalStyle`

  :root {

    --background-color: #FFF;
    --modal-background-color: #FFF;
    --modal-blur-color: rgba(0, 0, 0, 0.2);
    --modal-hover-color: rgb(238,241,244);
    
    --basic-color-1: #0085ff; 
    --basic-color-2: #006fff;
    
    --input-box-color: rgb(249, 249, 250);
    --box-shadow-color: #DBDBDB;

    --search-bar-color: #DBDBDB;
    --skeleton-color: #DBDBDB;

    --border-color: #FF6B6B;
    
    --basic-btn-color: #0085ff;
    --bold-btn-color: #006fff;
    --disabled-btn-color: #E6E2E2;
    
    --disabled-btn-text-color: #FFF;
    
    --text-color-1: #000;
    --text-color-2: #767676;
    --text-color-3: #333;
    --text-color-4: #767676;
    --logo-color: #000;
    
    --common-text-color-1: #FFF;
    --common-text-color-2: #000;
    --invert-color: #000;
    
    --icon-active-on: #767676;
    --icon-active-off: #DBDBDB;
    
    /* --header-shadow: 0px 4px 4px rgba(0, 0, 0, 0.10); */
    --navbar-shadow: 0 -4px 4px rgba(0, 0, 0, 0.10);
    --header-color: #f5f5f5;
    --navbar-color: #f5f5f5;
  }
`;

export default DefaultTheme;
