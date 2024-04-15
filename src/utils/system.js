/**
 * Author: Meng
 * Date: 2023-11-14
 * Modify: 2023-11-14
 * Desc: 
 */

// 
function fileToBolb(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file[0]);
  console.log(reader)
}

// base64 转成blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

function blobToBuffer() {
  let blob = new Blob([1, 2, 3, 4])
  let reader = new FileReader();
  reader.onload = function (result) {
    console.log(result);
  }
  reader.readAsArrayBuffer(blob);

  // let blob = new Blob([buffer])

}

// 64转file
function base64ConvertFile(urlData, filename) {
  if (typeof urlData != 'string') {
    return;
  }
  let arr = urlData.split(',')
  let type = arr[0].match(/:(.*?);/)[1]
  let fileExt = type.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], 'filename.' + fileExt, {
    type: type
  });
}

function getFormData() {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  let fileObj = base64ConvertFile('base64文件', '文件名称')
  let formdata = new FormData()
  formdata.append('file', fileObj, '名称')
}

function canvas() {
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext('2d');

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let uint8ClampedArray = imageData.data;

}

function wsbuffer() {
  const socket = new WebSocket('ws://xxxx');
  socket.binaryType = 'arraybuffer';

  // Wait until socket is open
  socket.addEventListener('open', function (event) {
    // Send binary data
    const typedArray = new Uint8Array(4);
    socket.send(typedArray.buffer);
  });

  // Receive binary data
  socket.addEventListener('message', function (event) {
    const arrayBuffer = event.data;
  });
}