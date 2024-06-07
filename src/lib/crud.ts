// 'use server'

// import { UserSchema } from "@/app/crud/components/adduser";
// import { UserSchemaUpdate } from "@/app/crud/components/updateUser";
// import { PrismaClient  } from "@prisma/client";
// import axios from "axios";
// const { ObjectId } = require('mongodb');




// export const fetchData = async () => {
//     try {
//       const response = await axios.get(`https://vezftdotekleudzihoah.supabase.co/rest/v1/tabla1`, {
//         headers: {
//         }
//       });
//       return response.data;
      
//     } catch (error) {
//       console.error('Error al obtener datos de Supabase:', error);
//       throw error;
//     }

//   };

// // CREATE USER
// export const createUser = async(data:UserSchema) => {

//     try {
//         const prisma = new PrismaClient();
//         const newUser = {
//             name  : data.name,
//             email : data.email ,
//             type  : data.type ,
//             gender: data.gender
//         };
//         const createdUser = await prisma.user.create({
//             data:newUser,
//         })
//         console.log('user created: ', createdUser)
//     } catch (error) {
//         console.log(error)
//     }
// }


// // READ USER

// export const readUser = async(page, pageSize) => {
//   try {
//       const prisma = new PrismaClient()
//       const itemData = await prisma.user.findMany({
//         take: pageSize,
//         skip: (page - 1) * pageSize
//       })
//       return itemData 
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const readUser2 = async() => {
//   try {
//       const prisma = new PrismaClient()
//       const itemData = await prisma.user.findMany()
//       return itemData 
//   } catch (error) {
//     console.log(error)
//   }
// }


// //UPDATE USER

// export const updateUserLib = async (data:UserSchemaUpdate ) => { 
//   const objectIdString = data.idData; // Tu _id de MongoDB como una cadena
//   console.log(data.idData)

//   try {
//     const prisma = new PrismaClient()
//     const dataUpdate= {
//       name  : data.name,
//       email : data.email,
//       type  : data.type,
//       gender: data.gender,
//     }
//     const updateUserFirst = await prisma.user.update({
//       where: {
//         id:objectIdString  
//       },
//       data: dataUpdate,
//     });
//     console.log('user update: ', updateUserFirst)
//   } catch (error) {
//     console.log(error)
//   }
// }


// //REMOVE USER

// export const removeUserLib = async (data:UserSchemaUpdate) => {
//   const objectIdString = data.idData; // Tu _id de MongoDB como una cadena
//   console.log(data.idData)
//   try {
//     const prisma = new PrismaClient()
//     await prisma.user.delete({
//       where:{
//         id:objectIdString
//       }
//     })
//     console.log('the user delete ')
//   } catch (error) {
//     console.log(error)
//   }
// }