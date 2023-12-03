const mergeForm = document.getElementById("mergeForm");

// const yourImage = document.getElementById("yourImage");
// const receiptImage = document.getElementById("receiptImage");

const compressImage = async (file, { quality = 1, type = file.type }) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // Draw to canvas
  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imageBitmap, 0, 0);

  // Turn into Blob
  return await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
};
const receiptImage = document.getElementById("receiptImage");
const yourImage = document.getElementById("yourImage");

yourImage.addEventListener("change", async (e) => {
  const { files } = e.target;

  // No files selected
  if (!files.length) return;

  const dataTransfer = new DataTransfer();
  // For every file in the files list
  for (const file of files) {
    console.log(file.size / (1024 * 1024));
    if (file.size / (1024 * 1024) <= 0.5) {
      return 0;
    }
    // We don't have to compress files that aren't images
    if (!file.type.startsWith("image")) {
      // TODO: Not an image
      dataTransfer.items.add(file);
      continue;
    }

    // We compress the file by 50%
    const compressedFile = await compressImage(file, {
      // 0: is maximum compression
      // 1: is no compression
      quality: 0.5,

      // We want a JPEG file
      type: "image/jpeg",
    });

    const blobURL = URL.createObjectURL(compressedFile);
    const compressedFileAsFile = new File([compressedFile], blobURL, {
      type: compressedFile.type,
    });

    dataTransfer.items.add(compressedFileAsFile);
  }
  e.target.files = dataTransfer.files;
});

receiptImage.addEventListener("change", async (e) => {
  const { files } = e.target;

  // No files selected
  if (!files.length) return;

  const dataTransfer = new DataTransfer();
  // For every file in the files list
  for (const file of files) {
    console.log(file.size / (1024 * 1024));
    if (file.size / (1024 * 1024) <= 0.5) {
      return 0;
    }
    // We don't have to compress files that aren't images
    if (!file.type.startsWith("image")) {
      // TODO: Not an image
      dataTransfer.items.add(file);
      continue;
    }

    // We compress the file by 50%
    const compressedFile = await compressImage(file, {
      // 0: is maximum compression
      // 1: is no compression
      quality: 0.5,

      // We want a JPEG file
      type: "image/jpeg",
    });

    const blobURL = URL.createObjectURL(compressedFile);
    const compressedFileAsFile = new File([compressedFile], blobURL, {
      type: compressedFile.type,
    });

    dataTransfer.items.add(compressedFileAsFile);
  }
  e.target.files = dataTransfer.files;
});

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
