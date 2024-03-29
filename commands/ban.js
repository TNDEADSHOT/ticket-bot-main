const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban une personne.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Ban a member')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('reason for ban')
      .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'you n\'you dont have the required permissions to run this command (`BAN_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'the person you  want to ban is above you role  !',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'The person you want to ban is above me! So i cant ban him',
      ephemeral: true
    });

    if (interaction.options.getString('reason')) {
      user.ban({
        reason: interaction.options.getString('reason'),
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Was successfully banned !`
      });
    } else {
      user.ban({
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Was successfully banned!`
      });
    };
  },
};