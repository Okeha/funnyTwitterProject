const mergeForm = document.getElementById("mergeForm");

// const yourImage = document.getElementById("yourImage");
// const receiptImage = document.getElementById("receiptImage");

const mergeImages = (e) => {
  e.preventDefault();
  //instantiate canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const receiptImage = document.getElementById("receiptImage");
  const yourImage = document.getElementById("yourImage");

  const yourImg = new Image();
  const receiptImg = new Image();

  //initialize new file reader
  const fileReader1 = new FileReader();

  fileReader1.onload = function (event) {
    // on image load define canvas features
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

  // check for image tag to display output in html
  const resultImage = document.getElementById("resultImage");
  resultImage.src = canvas.toDataURL();

  //Assign downloadable link
  var link = document.getElementById("link");
  link.href = canvas.toDataURL();

  //just checking
  console.log({ message: "yo", yourImage, receiptImage });
};

const mergeImagesLayerFormat = (e) => {
  e.preventDefault();
  //instantiate canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const receiptImage = document.getElementById("receiptImage");
  const yourImage = document.getElementById("yourImage");

  const yourImg = new Image();
  const receiptImg = new Image();

  //initialize new file reader
  const fileReader1 = new FileReader();

  fileReader1.onload = function (event) {
    // on image load define canvas features
    receiptImg.onload = function () {
      canvas.width = receiptImg.width;
      canvas.height = receiptImg.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(receiptImg, 0, 0);

      ctx.drawImage(
        yourImg,
        0,
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

  // check for image tag to display output in html
  const resultImage = document.getElementById("resultImage");
  resultImage.src = canvas.toDataURL();

  //Assign downloadable link
  var link = document.getElementById("link");
  link.href = canvas.toDataURL();

  //just checking
  console.log({ message: "yo", yourImage, receiptImage });
};

mergeForm.addEventListener("submit", mergeImages);
// mergeForm.addEventListener("submit", mergeImagesLayerFormat);
