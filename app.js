var http = require('http');
var dispatcher = require('httpdispatcher');

/**
 * Id?: number;
 * Title: string;
 * Author: string;
 * AuthorGravatar: string;
 * URI: string;
 * DatePublished: Date;
 * ImageURI: string;
 * Contents: string;
 */
var posts = [
    {
        Id: 1,
        Title: "First Post",
        Author: "Harsh Verma",
        AuthorGravatar: "https://s3-us-west-2.amazonaws.com/harshv.public/harshv_avatar.jpg",
        URI: "",
        DatePublished: new Date('2016-01-02T08:24:00'),
        ImageURI: "",
        Contents: "This is first post. This is first post. This is first post. This is first post. This is first post."
    },
    {
        Id: 2,
        Title: "Second Post",
        Author: "Harsh Verma",
        AuthorGravatar: "https://s3-us-west-2.amazonaws.com/harshv.public/harshv_avatar.jpg",
        URI: "",
        DatePublished: new Date('2016-01-30T20:08:00'),
        ImageURI: "",
        Contents: "This is second post. This is second post. This is second post. This is second post. This is second post."
    },
    {
        Id: 3,
        Title: "Third Post",
        Author: "Harsh Verma",
        AuthorGravatar: "https://s3-us-west-2.amazonaws.com/harshv.public/harshv_avatar.jpg",
        URI: "",
        DatePublished: new Date('2016-02-13T13:24:00'),
        ImageURI: "",
        Contents: "This is third post. This is third post. This is third post. This is third post. This is third post."
    }
];

// Get posts
dispatcher.onGet('/api/posts', function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(posts));
});

// Get single post
dispatcher.onGet(/^\/api\/posts\/\d+$/, function(req, res) {
    var postIdRegExp = /(\d+)$/;
    var postId = parseInt(postIdRegExp.exec(req.url)[1]);
    if (postId === 0 || postId > posts.length) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("No post exists with id " + postId);
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(posts[postId - 1]));
    }
});

// Post new post
dispatcher.onPost('/api/posts', function(req, res) {
    posts.push(JSON.parse(req.body));
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
});

// Lets define a port we want to listen to
const PORT=9090;

// We need a function which handles requests and send response
function handleRequest(req, res){
    try {
        //log the request on console
        console.log("%s request at %s", req.method, req.url);
        //Disptach
        dispatcher.dispatch(req, res);
    } catch(err) {
        console.log(err);
    }
}

// Create a server
var server = http.createServer(handleRequest);

// Lets start our server
server.listen(PORT, function(){
    // Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
