function func() {
  console.log('OO');
  ta();
}

function ta() {
  console.log('hm');
}
function go(fun) {
  let stringFunc = JSON.stringify(fun);
  console.log(stringFunc);
  let funcnew = new Function('return ' + stringFunc)();
  funcnew();
}

go(func);
