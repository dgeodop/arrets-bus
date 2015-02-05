function noUnik() {
	var n1 = Math.floor(Date.now() / 1000);
	var n2 = Math.floor(Math.random() * 100000); 
	var f1 = n1.toString(); var f2 = n2.toString(); 
	var f = f1 + f2; 
	return +f
}
