const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Shows information about a member.')
    .addUserOption(option =>
      option
        .setName('member')
        .setDescription('The member to get information about')
        .setRequired(false)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember('member') || interaction.member;
    const roles = member.roles.cache.map(role => role.toString());

    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL())
      .setTitle(`👋 Welcome to ${member.user.username}'s Profile!`)
      .addField('#️⃣ Tag:', member.user.tag)
      .addField('📡 Joined Guild at:', member.joinedAt.toString())
      .addField('💬 Joined Discord at:', member.user.createdAt.toString());

    if (!member.presence || !member.presence.activities.length) {
      embed.addField('⚽️ Activity:', 'Not playing anything');
    } else {
      const activity = member.presence.activities[0];
      embed.addField('⚽️ Activity:', `${activity.type} ${activity.name}\n${activity.details}\n${activity.state}`);
    }

    embed.addField('📱 Platform:', Object.keys(member.presence?.clientStatus || {}).join(', '));
    embed.addField('🤖 Bot:', member.user.bot ? 'Yes' : 'No');
    embed.addField('📜 Roles:', roles.join(' | '));
    embed.setFooter('Bot made with discord.js');

    await interaction.reply({ embeds: [embed] });
  },
};