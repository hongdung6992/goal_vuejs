console.log("=================================")

function first() {
    setTimeout(() => {
        console.log("Tương tác với server");
    }, 5000);
}

function second() {
    console.log("Trước khi gọi function first()");
    first();
    console.log("Sau khi gọi function first()");
}

function login(username, password) {
    return new Promise(
        function(resolve, reject) {
            console.log("server đang xử lí...");
            setTimeout(() => {
                console.log("server xử lí thành công");
                let data = {
                    username: username,
                    password: '4723894dshjkf23902dvbk-3278974hfe',
                    isLogin: true,
                    userId: 'dhajkd-dshjksf-fdshkjfh'
                }
                resolve(data);

            }, 2000);
        
        }
    );
}

function getPostByUserid(userid) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log("Server getPosstByUserId xử lí thành công, userid = ", userid);

            let data = [
                {
                    postId: 1,
                    userid,
                    content: 'hdjkfhskf'
                },
                {
                    postId: 1,
                    userid,
                    content: 'hdjkfhskf'
                }
            ];
            reject({
                data,
                error: 'Xử lí post by userid error'
            });
        }, 4000);
    })
}

async function handleLoginUser() {
    try {
        var resultLogin = await login('admin', 'admin');
        var resultPost = await getPostByUserid(resultLogin.userId);
        console.log("resultLogin = ", resultLogin);
        console.log("resultPost = ", resultPost);
    } catch (error) {
        console.log("error = ", error);
    }
}

var resultPost = fetch('http://192.168.1.125:8000/api/v1/posts');

var start = new Date().getTime();
resultPost.then(function(response) {
    var end = new Date().getTime();
    // console.log("response", response.json());
    console.log("time = ", end / start);
    return response.json();
}).then(function(myJson) {
    console.log(myJson);
});

// Axios

console.log("=================================")