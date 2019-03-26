import { TextDecoder } from 'text-encoding';
import { Message } from 'element-ui';

export default function downloadFile(res, fileName) {
    if (res.headers['content-type'].indexOf('application/json') > -1) {
        const enc = new TextDecoder('utf-8');
        const resData = JSON.parse(enc.decode(new Uint8Array(res.data)));
        if (resData.status === false) {
            if (resData.msg) {
                Message.error(resData.msg);
            }
            return;
        } else if (resData.status === true) {
            if (resData.msg) {
                Message.success(resData.msg);
            }
        }
    }
    const blob = new Blob([res.data], { type: 'application/octet-stream;charset=utf-8' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    const userAgent = navigator.userAgent;
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    const isEdge = userAgent.indexOf('Edge') > -1;
    if (isIE || isIE11 || isEdge) {
        navigator.msSaveBlob(blob, fileName);
    } else {
        downloadElement.download = fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
    }
}