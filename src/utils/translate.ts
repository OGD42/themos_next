// "use server"

// async function handleLanguage({
//   message,
//   locale,
// }: {
//   message: string;
//   locale: string;
// }) {
//   if (locale === "en") {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: messages.english,
//         },
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 64,
//       top_p: 1,
//     });
//     return response;
//   } else {
//     const grammarCheck = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: messages.spanish,
//         },
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 64,
//       top_p: 1,
//     });
//     const fixedMessage = grammarCheck.choices[0].message.content || "";
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You will be provided with a sentence in Spanish, and your task is to translate it into English.",
//         },
//         {
//           role: "user",
//           content: fixedMessage,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 64,
//       top_p: 1,
//     });
//     return response;
//   }
// }

// const messages = {
//   spanish:
//     "You will be provided with statements in Spanish, and your task is to convert them to standard Spanish.",
//   english:
//     "You will be provided with statements, and your task is to convert them to standard English.",
// };
