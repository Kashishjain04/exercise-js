function executePattern(pattern, string){
	if(!pattern.exec(string)) return false;
	return true;
}

function regNoVaildator(regNo) {
	let pattern = /[A-Za-z]{2}[0-9]{8}/;
	if (executePattern(pattern, regNo)) return { success: true };
	// length -> 10
	pattern = /^.{10}$/;
	if(!executePattern(pattern, regNo)) return {error: "Length must be exactly 10 characters"};
	// no spaces permitted
	pattern = /.* .*/
	if(executePattern(pattern, regNo)) return {error: "Spaces are not permitted"};
	// no special character permitted
	pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
	if(executePattern(pattern, regNo)) return {error: "No special characters permitted"};
	// first 2 chars -> alphabets
	pattern = /[A-Za-z]{2}.{8}/
	if(!executePattern(pattern, regNo)) return {error: "First two spaces must me alphabet"};
	// no alphabet allowed in list 8 spaces
	pattern = /[A-Za-z]{2}([0-9]*[A-Za-z]+[0-9]*)/
	if(executePattern(pattern, regNo)) return {error: "Last 8 characters can not have alphabet"};
	else return {error: "Pattern mismatch"}
}

export default regNoVaildator;