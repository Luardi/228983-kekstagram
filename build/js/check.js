function getMessage(a,b) {
  if (typeof a === "boolean") {
    if (a) {return "Переданное GIF-изображение анимировано и содержит " + b + " кадров"}
    else return "Переданное GIF-изображение не анимировано"
  }
  if (typeof a === "number") {
    return "Переданное SVG-изображение содержит " + a + " объектов и " + (b * 4) + " атрибутов"
  }
  if (typeof a === "object" && typeof b === "object") {
    return "Общая площадь артефактов сжатия: " + artifactsSquare(a,b) + " пикселей"
  }
  if (typeof a === "object" && typeof b !== "object") {
    return "Количество красных точек во всех строчках изображения: " + amountOfRedPoints(a)
  }
  function amountOfRedPoints (a) {
    var sum = 0;
    for (i=0;i<a.length;i++) {
      sum += a[i];
      return sum;
    }
  }
  function artifactsSquare (a,b) {
    var sum = 0;
    for (i=0;i<a.length;i++) {
      sum += a[i] * b[i];
      return sum;
    }
  }
}
