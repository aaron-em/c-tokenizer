var Tokenizer = require('tokenizer');

module.exports = function (cb) {
  var t = new Tokenizer(cb);

  t.addRule(/^\/\*([^*]|\*(?!\/))*\*\/$/, 'area comment');
  t.addRule(/^\/\*([^*]|\*(?!\/))*\*?$/, 'area comment continue');

  t.addRule(/^\/\/[^\n]*$/, 'line comment');
  t.addRule(/^"([^"\n]|\\")*"?$/, 'quote');
  t.addRule(/^'(\\?[^'\n]|\\')'?$/, 'char');
  t.addRule(/^'[^']*$/, 'char continue');

  t.addRule(/^#(\S*)$/, 'directive');

  t.addRule(/^;$/, 'semicolon');

  t.addRule(/^\($/, 'open paren');
  t.addRule(/^\)$/, 'close paren');
  t.addRule(/^\[$/, 'open square');
  t.addRule(/^\]$/, 'close square');
  t.addRule(/^{$/, 'open curly');
  t.addRule(/^}$/, 'close curly');

  t.addRule(/^(?:auto|register|static|extern)$/, 'storage class');
  t.addRule(/^(?:const|volatile|restrict|_Atomic|atomic)$/, 'type qualifier');

  // untested, probably broken
  t.addRule(/^(?:(?:(?:signed |unsigned )?(?:char|int|short|long|float|double))|struct)(?:\s*\*)?$/,
    'type specifier');

  t.addRule(/^(?:if|elseif|else|for|while|do|switch|case|default|break|continue|goto|return)$/,
    'keyword');

  t.addRule(/^([-<>~!%^&*\/+=?|.,:]|->|<<|>>|\*\*|\|\||&&|--|\+\+|[-+*|&%\/=]=)$/,
    'operator');

  t.addRule(/^([_A-Za-z]\w*)$/, 'identifier');

  t.addRule(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, 'number');
  t.addRule(/^(\s+)$/, 'whitespace');

  t.addRule(/^\\\n?$/, 'line continue');

  return t;
};
