const url = $request.url;
const method = $request.method;
//console.log($response.body)
if($response.body === undefined){
    // ��ɽ���и��ʻ��д����
    console.log('$response.bodyΪundefined');
    $done({});
}
let body = JSON.parse($response.body);

const getMethod = "GET";
const postMethod = "POST";
const noticeTitle = "�������";

if ((url.indexOf("api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk") !== -1
    || url.indexOf("is.snssdk.com/api/ad/union/sdk") !== -1 )
    && method === postMethod) {
    console.log('��ɽ��-get_ads');
    if (body.message === undefined) {
        console.log("body:" + $response.body);
        // ������ https://www.csjplatform.com/supportcenter/5421
        if (!body.hasOwnProperty('status_code')) {
            $notification.post(noticeTitle, "��ɽ��", "message/status_code�ֶδ���");
        } else {
            console.log('���Ϊ��');
        }
    } else {
        console.log(Object.keys(body));
        body = {
            "request_id": 'F5617E54-3FF4-4052-9B09-4227D09B5105',
            "status_code":20001,
            "reason":112,
            "desc":"�ô���λ���������������Ĺ��ͣ��������ʿ�����10%���ڣ��ò���ÿ����Ч���������ô���λ���������ǻ�������С��5000������ղ������иò���"
        };
        console.log('�ɹ�');
    }
} else if (url.indexOf('mi.gdt.qq.com') !== -1 && method === getMethod) {
    console.log('������');
    if (body.hasOwnProperty('ret')) {
        if (body.ret === 0) {
            // https://developers.adnet.qq.com/doc/android/union/union_debug#sdk%20%E9%94%99%E8%AF%AF%E7%A0%81
            body.ret = 102006;
            console.log('�޸�ret�ɹ�');
        } else {
            console.log(`ret��Ϊ0,������`);
        }
    } else {
        console.log("body:" + $response.body);
        $notification.post(noticeTitle, "������", "��ret");
    }
} else if (url.indexOf('open.e.kuaishou.com') !== -1 && method === postMethod) {
    console.log('��������');
    if (body.result === 1) {
        // ������: https://u.kuaishou.com/home/detail/1158
        body.result = 40003;
        console.log('�޸�result�ɹ�');
    } else {
        console.log('�����޸�result');
    }
} else {
    $notification.post(noticeTitle, "·��/���󷽷�ƥ�����:", method + "," + url);
}

body = JSON.stringify(body);

$done({
    body
});