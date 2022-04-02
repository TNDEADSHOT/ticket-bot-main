const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a person')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('member to kick')
      .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Reason to kick')
        .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
      content: 'you n\'do not have permission to run this command ! (`KICK_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'The person you want to kick is above your role !',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: 'The person you want to kick is above me! So I cant kick it',
      ephemeral: true
    });

    if (interaction.options.getString('Reason')) {
      user.kick(interaction.options.getString('Reason'))
      interaction.reply({
        content: `**${user.user.tag}** Was successfully kicked !`
      });
    } else {
      user.kick()
      interaction.reply({
        content: `**${user.user.tag}** Was successfully kicked !`
      });
    };
  },
};