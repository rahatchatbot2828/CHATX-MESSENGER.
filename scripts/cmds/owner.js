module.exports = {
  config: {
    name: "owner",
    version: 3.6,
    author: "Azadx69x",
    longDescription: "Stylish hardcoded owner & bot info card with emojis",
    category: "Special",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, message }) {
    const mainMedia = "https://files.catbox.moe/1d9xsl.mp4";
    const fallbackMedia = "https://scontent.xx.fbcdn.net/v/t1.15752-9/537397354_1980840699345865_2351462868400401293_n.jpg";

    let attachment;
    try {
      attachment = await global.utils.getStreamFromURL(mainMedia);
    } catch {
      try {
        attachment = await global.utils.getStreamFromURL(fallbackMedia);
      } catch {
        attachment = null;
      }
    }

    const body = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
╭─╼━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╾─╮
│           👑 OWNER INFO 👑
│
│ 🧑‍💼 Name       : 𝐑𝐀𝐇𝐀𝐓
│ 🪪 Username   : azadxxx075
│ 🎂 Birthday   : 21 Nov
│ 🐸 Age        : 15+
│ 📚 Study      : 10
│ 💕 Relation   : Single
│ 📱 Contact    : 01828832911
│ ✉️ Email      : rahatmahmud929@gmail.com
│ 🌍 Location   : Chittagong, Bangladesh
│ 🕋 Religion   : Islam
│ 🌐 Facebook   : https://www.facebook.com/rahat122485
│ 🎮 Hobby      : Gaming
│ 💻 Skill      : 𝐆𝐨𝐫𝐢𝐛𝐞𝐫 𝐚𝐛𝐫 𝐬𝐤𝐢𝐥𝐥
│ 🎵 Fav Song   : sesh-kanna
│ 🕐 Timezone   : GMT+6 (Bangladesh)
│
│           🤖 BOT INFO 🤖
│
│ 🛠 Bot Name   : ✰🪽°ℝ𝕀ℕ ℕ𝕆ℍ𝔸ℝ𝔸°🐰࿐
│ 🔰 Prefix     : )
│ 👑 Author     : 𝐑𝐀𝐇𝐀𝐓
│
│         ⚡ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐑𝐀𝐇𝐀𝐓 ⚡
╰─╼━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╾─╯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    message.reply({
      body,
      attachment
    });
  }
};
