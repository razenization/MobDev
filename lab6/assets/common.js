export const itemInfoSelector = (key) => {
  switch (key) {
    case '9780321856715':
      return require('../books-info/9780321856715.json');
    case '9780321862969':
      return require('../books-info/9780321862969.json');
    case '9781118841471':
      return require('../books-info/9781118841471.json');
    case '9781430236054':
      return require('../books-info/9781430236054.json');
    case '9781430237105':
      return require('../books-info/9781430237105.json');
    case '9781430238072':
      return require('../books-info/9781430238072.json');
    case '9781430245124':
      return require('../books-info/9781430245124.json');
    case '9781430260226':
      return require('../books-info/9781430260226.json');
    case '9781449308360':
      return require('../books-info/9781449308360.json');
    case '9781449342753':
      return require('../books-info/9781449342753.json');

    default:
      return require('../books-info/default.json');
  }
};

export const imageSelector = (key) => {
  switch (key) {
    case 'Image_01.png':
      return require('../images/Image_01.png');
    case 'Image_02.png':
      return require('../images/Image_02.png');
    case 'Image_03.png':
      return require('../images/Image_03.png');
    case 'Image_05.png':
      return require('../images/Image_05.png');
    case 'Image_06.png':
      return require('../images/Image_06.png');
    case 'Image_07.png':
      return require('../images/Image_07.png');
    case 'Image_08.png':
      return require('../images/Image_08.png');
    case 'Image_10.png':
      return require('../images/Image_10.png');
    default:
      return require('../images/noimg.jpg');
  }
};
