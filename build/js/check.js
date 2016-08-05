function getMessage(a,b) {
  if (typeof a === "boolean") {
    if (a) {return "Переданное GIF-изображение анимировано и содержит " + b + " кадров"}
    else return "Переданное GIF-изображение не анимировано"
  }
  if (typeof a === "number") {
    return "Переданное SVG-изображение содержит " + a + " объектов и " + (b * 4) + " атрибутов"
  }
  if (typeof a === "object" & typeof b === "object") {
    return "Общая площадь артефактов сжатия: " + artifactsSquare(a,b) + " пикселей"
  }
  if (typeof a === "object" & typeof b !== "object") {
    return "Количество красных точек во всех строчках изображения: " + amountOfRedPoints(a)
  }
  var amountOfRedPoints = function (a) {
    for (i=0;i<a.length;i++) {
      var sum = 0;
      sum += a[i];
      return sum;
    }
  }
  var artifactsSquare = function (a,b) {
    for (i=0;i<a.length;i++) {
      var sum = 0;
      sum += a[i] * b[i];
      return sum;
    }
  }
}
