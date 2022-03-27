//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
  console.log($('#navbarPlaceholder').load('./text/nav.html'));
  console.log($('#navbarwithoutloginPlaceholder').load('./text/navbarwithoutlogin.html'));
  console.log($('#footerPlaceholder').load('./text/footer.html'));
  console.log($('#heroPlaceholder').load('./text/hero.html'));
  console.log($('#surveyPlaceholder').load('./text/surveyskeleton.html'));
  console.log($('#searchPlaceholder').load('./text/search.html'));
  console.log($('#hero2Placeholder').load('./text/hero-version2.html'));
}
loadSkeleton();  //invoke the function