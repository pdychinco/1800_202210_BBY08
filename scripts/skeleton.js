//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
  console.log($('#navbarPlaceholder').load('./text/nav.html'));
  console.log($('#footerPlaceholder').load('./text/footer.html'));
  console.log($('#heroPlaceholder').load('./text/hero.html'));
}
loadSkeleton();  //invoke the function