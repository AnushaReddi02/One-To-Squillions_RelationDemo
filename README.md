# 📌 Mongoose One-to-Many Relationship (One to Squillions)

This project demonstrates how to implement a **One-to-Many relationship** in MongoDB using **Mongoose**.

In this relationship model, **one user can have many posts**, and each post stores a **reference to the user using ObjectId**.

This pattern is often called **One-to-Squillions**, where one document can be related to a very large number of other documents.

---

# 🧠 Concept

### One-to-Squillions Relationship

In MongoDB, when one document has **many related documents**, it is more efficient to store the **reference in the child document** rather than embedding all the data.

Example relationship:

User
├── Post
├── Post
├── Post
└── Post

Each **Post document stores the User's ObjectId**.

---

# 🛠️ Technologies Used

* Node.js
* MongoDB
* Mongoose (ODM)

---

# 📂 Database Used

```
OneToSquillionsRelationDemo
```

MongoDB connection string:

```
mongodb://127.0.0.1:27017/OneToSquillionsRelationDemo
```

---

# 📄 Schema Design

## User Schema

```
const userSchema = new Schema({
  username: String,
  mail: String
});
```

Example User Document:

```
{
  "_id": "65f1abc123",
  "username": "Anusha Reddi",
  "mail": "anu@gmail.com"
}
```

---

## Post Schema

```
const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
```

Example Post Document:

```
{
  "content": "Some bowl fast, some lead well… Pat Cummins does both 😎🤙🏻🔥",
  "likes": 12377000,
  "user": "65f1abc123"
}
```

Here, the **user field stores the ObjectId of the User document**.

---

# ⚙️ Adding Data

The `addData()` function:

1. Finds a user in the database
2. Creates a new post
3. Assigns the user reference to the post
4. Saves the post

Example:

```
let user = await User.findOne({ username: "Anusha Reddi" });

let post2 = new Post({
  content: "Some bowl fast, some lead well… Pat Cummins does both 😎🤙🏻🔥",
  likes: 12377000
});

post2.user = user;

await post2.save();
```

---

# 🔎 Fetching Data using populate()

Mongoose provides the **populate()** method to replace ObjectId references with the actual document data.

```
let result = await Post.find({}).populate("user", "username");
console.log(result);
```

Instead of returning:

```
user: ObjectId("65f1abc123")
```

Mongoose returns:

```
user: {
  username: "Anusha Reddi"
}
```

---

# 📊 Example Output

```
[
 {
   content: "Some bowl fast, some lead well… Pat Cummins does both 😎🤙🏻🔥",
   likes: 12377000,
   user: {
     username: "Anusha Reddi"
   }
 }
]
```

---

# 🚀 Key Mongoose Concepts Used

| Concept     | Description                              |
| ----------- | ---------------------------------------- |
| Schema      | Defines structure of MongoDB documents   |
| Model       | Interface to interact with collections   |
| ObjectId    | Reference to another document            |
| populate()  | Fetches referenced document data         |
| Async/Await | Handles asynchronous database operations |

---

# ▶️ How to Run the Project

### 1️⃣ Install Dependencies

```
npm install mongoose
```

### 2️⃣ Start MongoDB

Make sure MongoDB is running locally.

### 3️⃣ Run the Script

```
node index.js
```

---

# 🎯 Learning Outcome

By completing this project, you will understand:

* MongoDB document relationships
* One-to-Many database design
* Referencing documents using ObjectId
* Fetching related documents using populate()

---

# 📚 Author

**Reddi Anusha**
Computer Science Engineering Student
MVGR College of Engineering
