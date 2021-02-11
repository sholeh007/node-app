// import mongodb from "mongodb";
// import { getDb } from "../data/database.js";
// class productModel {
//   constructor(title, imageUrl, price, description, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this.userId = userId;
//   }

//   static async getAllProduct() {
//     const db = getDb();
//     try {
//       const result = await db.collection("product").find().toArray();
//       return result;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   static async findById(id) {
//     const db = getDb();
//     try {
//       const result = await db
//         .collection("product")
//         .find({ _id: new mongodb.ObjectId(id) })
//         .next();
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async save(id = "") {
//     const db = getDb();
//     let data;
//     try {
//       if (id) {
//         data = await db
//           .collection("product")
//           .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: this });
//         return data;
//       }
//       data = await db.collection("product").insertOne(this);
//       return data;
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   static async delete(id) {
//     const db = getDb();
//     try {
//       await db
//         .collection("product")
//         .deleteOne({ _id: new mongodb.ObjectId(id) });
//       return;
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }

// export default productModel;
