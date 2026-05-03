// src/backend/create-teacher.js
import mongoose from "mongoose";

const uri = "mongodb://diyu:db1234@ac-gud7f9w-shard-00-00.03jf3y8.mongodb.net:27017,ac-gud7f9w-shard-00-01.03jf3y8.mongodb.net:27017,ac-gud7f9w-shard-00-02.03jf3y8.mongodb.net:27017/?ssl=true&replicaSet=atlas-flyi14-shard-0&authSource=admin&appName=Clust1";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: String,
  createdAt: { type: Date, default: Date.now }
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

const run = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB Atlas");

    // Add a teacher
    const newTeacher = await Teacher.create({ name: "Mr. Sharma", subject: "Mathematics" });
    console.log("🎉 Teacher created:", newTeacher);

    // Read teacher
    const teacher = await Teacher.findOne({ name: "Mr. Sharma" });
    console.log("📊 Found teacher:", teacher);

    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

run();
