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
  console.log($('#restaurantCardTemplatePlaceholder').load('./text/restaurantTemplate.html'));
  console.log($('#favouritesCardTemplatePlaceholder').load('./text/favouritesTemplate.html'));
}
loadSkeleton();  //invoke the function