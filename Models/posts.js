//ONE - MANY RELATIONSHIP in Mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

main()
    .then(() => console.log("Conection Successful!!!"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/OneToSquillionsRelationDemo');
}

const userSchema = new Schema ({
    username : String,
    mail : String
});

const postSchema = new Schema ({
  content : String,
  likes : Number,
  user : {
    type : Schema.Types.ObjectId,
    ref : "User"
  }
});

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

const addData = async () => {
 /*
      let user1 = new User({
        username : "Anusha Reddi",
        mail : "anu@gmail.com"
      });

      let post1 = new Post({
        content : "That smile, those blue eyes, and that unstoppable bowling — Pat Cummins magic 💕",
        likes : 123457000,
     });
 */
  let user = await User.findOne({username : "Anusha Reddi"})

    let post2 = new Post({
        content : "Some bowl fast, some lead well… Pat Cummins does both 😎🤙🏻🔥",
        likes : 12377000,
     });

     post2.user = user;

    // await user1.save();
    await post2.save();
}

const getData = async () => {
  let result = await Post.find({}).populate("user","username");
  console.log(result);
}
getData();
// addData();