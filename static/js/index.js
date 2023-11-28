const mergeForm = document.getElementById("mergeForm");

const yourImage = document.getElementById("yourImage");
const receiptImage = document.getElementById("receiptImage");

const mergeImages = (e) => {
  e.preventDefault();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const receiptImage = document.getElementById("receiptImage");
  const yourImage = document.getElementById("yourImage");

  const yourImg = new Image();
  const receiptImg = new Image();

  const fileReader1 = new FileReader();
  fileReader1.onload = function (event) {
    receiptImg.onload = function () {
      canvas.width = receiptImg.width + 20 + yourImg.width;
      canvas.height = receiptImg.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(receiptImg, 0, 0);

      ctx.drawImage(
        yourImg,
        receiptImg.width + 20,
        0,
        receiptImg.width * 0.7,
        receiptImg.height * 0.7
      );
    };
    receiptImg.src = event.target.result;
  };
  fileReader1.readAsDataURL(receiptImage.files[0]);

  const fileReader2 = new FileReader();
  fileReader2.onload = function (event) {
    yourImg.src = event.target.result;
  };

  fileReader2.readAsDataURL(yourImage.files[0]);

  const resultImage = document.getElementById("resultImage");

  // resultIma;
  resultImage.src = canvas.toDataURL();

  var link = document.getElementById("link");
  link.href = canvas.toDataURL();

  console.log({ message: "yo", yourImage, receiptImage });
};
mergeForm.addEventListener("submit", mergeImages);
