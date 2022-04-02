const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Give bot credits.'),
  async execute(interaction, client) {
    const embed = new client.discord.MessageEmbed()
      .setColor('6d6ee8')
      .setDescription('Développé avec le <:heart:901205849404493854> By TN DEADSHOT\n\n  [<:discord:901207777765130300>](https://discord.gg/snw9CCgkfb)')
      .setFooter(client.config.footerText, client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  },
};